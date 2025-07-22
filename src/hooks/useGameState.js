import { useState, useEffect, useCallback } from 'react';
import { careerLevels } from '../data/gameData';
import { getCurrentLevel, getSpeedMultiplier } from '../utils/gameUtils';

export const useGameState = () => {
  // Game state
  const [user, setUser] = useState({
    name: "Alex Professional",
    followers: 47,
    level: 1,
    energy: 20,
    maxEnergy: 20,
    fractionalEnergy: 0, // Track partial energy gains
    experience: 47,
    totalPosts: 3,
    totalLikes: 15,
    totalComments: 8,
    combo: 0,
    streak: 0,
    lastActionTime: 0,
    lastPostTime: 0,
    postCooldown: 20000, // 20 seconds in milliseconds
    gameStartTime: Date.now(), // Track when game started
    gameCompletionTime: null, // Track when game was completed
    upgrades: {
      batchActions: false,
      autoEngagement: false,
      viralBoost: false,
      energyEfficiency: false,
      speedMultiplier: 1,
      fastPosting: 0, // reduces cooldown
      ultraFastPosting: 0 // halves cooldown
    }
  });

  const [posts, setPosts] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [followerGains, setFollowerGains] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [speedBoost, setSpeedBoost] = useState(1);
  const [comboTimer, setComboTimer] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);

  // Use energy with efficiency upgrade consideration
  const consumeEnergy = useCallback((amount) => {
    const actualCost = user.upgrades?.energyEfficiency ? Math.ceil(amount * 0.5) : amount;
    if (user.energy >= actualCost) {
      setUser(prev => ({ ...prev, energy: prev.energy - actualCost }));
      return true;
    }
    return false;
  }, [user.energy, user.upgrades?.energyEfficiency]);

  // Add combo system
  const addCombo = useCallback(() => {
    const now = Date.now();
    const timeSinceLastAction = now - user.lastActionTime;

    if (timeSinceLastAction < 3000) { // 3 second window
      setUser(prev => ({
        ...prev,
        combo: prev.combo + 1,
        streak: prev.streak + 1,
        lastActionTime: now
      }));

      // Reset combo timer
      if (comboTimer) clearTimeout(comboTimer);
      const timer = setTimeout(() => {
        setUser(prev => ({ ...prev, combo: 0 }));
      }, 3000);
      setComboTimer(timer);
    } else {
      setUser(prev => ({
        ...prev,
        combo: 1,
        streak: 0,
        lastActionTime: now
      }));
    }
  }, [user.lastActionTime, comboTimer]);

  // Trigger achievement notification
  const triggerAchievement = useCallback((title, icon) => {
    const newAchievement = { id: Date.now(), title, icon };
    setAchievements(prev => [...prev, newAchievement]);
    setShowAchievement(newAchievement);
    setTimeout(() => setShowAchievement(null), 3000);
  }, []);

  // Check for achievements
  const checkAchievements = useCallback((followerCount) => {
    const milestones = [
      { count: 100, title: "First 100 Followers", icon: "🎯" },
      { count: 500, title: "Rising Influencer", icon: "⭐" },
      { count: 1000, title: "Thought Leader", icon: "🧠" },
      { count: 5000, title: "Industry Expert", icon: "👑" }
    ];

    milestones.forEach(milestone => {
      if (followerCount >= milestone.count && user.followers < milestone.count) {
        if (!achievements.find(a => a.title === milestone.title)) {
          setTimeout(() => {
            triggerAchievement(milestone.title, milestone.icon);
          }, 1000);
        }
      }
    });
  }, [user.followers, achievements, triggerAchievement]);

  // Add followers with animation and energy gain
  const addFollowers = useCallback((baseAmount, source = "") => {
    const speedMultiplier = getSpeedMultiplier(user.followers, user.combo);
    const comboBonus = user.combo > 3 ? Math.floor(user.combo / 3) : 0;
    const streakBonus = user.streak > 10 ? Math.floor(user.streak / 10) : 0;

    const userSpeedMultiplier = user.upgrades?.speedMultiplier || 1;
    const totalAmount = Math.floor(baseAmount * speedMultiplier * userSpeedMultiplier) + comboBonus + streakBonus;
    const newFollowerCount = user.followers + totalAmount;

    // Calculate energy gain based on level - more immediate and fair
    const currentLevel = getCurrentLevel(user.followers);
    const energyPerFollower = {
      'Intern': 0.1,      // 1 energy per 10 followers
      'Professional': 0.15, // 1 energy per ~7 followers  
      'Manager': 0.2,     // 1 energy per 5 followers
      'Director': 0.25,   // 1 energy per 4 followers
      'VP': 0.3,         // 1 energy per ~3 followers
      'C-Suite': 0.5     // 1 energy per 2 followers
    };

    const energyRate = currentLevel?.title ? energyPerFollower[currentLevel.title] || 0.1 : 0.1; // Default to Intern rate
    const fractionalEnergyGain = totalAmount * energyRate;

    setUser(prev => {
      // Add fractional energy to existing fractional energy
      const newFractionalEnergy = prev.fractionalEnergy + fractionalEnergyGain;
      
      // Calculate how many whole energy points we can award
      const wholeEnergyGain = Math.floor(newFractionalEnergy);
      
      // Keep remaining fractional energy for next time
      const remainingFractionalEnergy = newFractionalEnergy - wholeEnergyGain;
      
      return {
        ...prev,
        followers: newFollowerCount,
        experience: newFollowerCount,
        energy: Math.min(prev.maxEnergy, prev.energy + wholeEnergyGain),
        fractionalEnergy: remainingFractionalEnergy
      };
    });

    // Create floating animation with multiplier info
    const gainId = Date.now();
    const displayText = speedMultiplier > 1 || comboBonus > 0 || streakBonus > 0
      ? `+${totalAmount} (${speedMultiplier.toFixed(1)}x speed${comboBonus > 0 ? `, +${comboBonus} combo` : ''}${streakBonus > 0 ? `, +${streakBonus} streak` : ''})`
      : `+${totalAmount}`;

    setFollowerGains(prev => [...prev, {
      id: gainId,
      amount: totalAmount,
      source: displayText,
      fractionalEnergyGain: fractionalEnergyGain
    }]);

    // Remove animation after 2 seconds
    setTimeout(() => {
      setFollowerGains(prev => prev.filter(gain => gain.id !== gainId));
    }, 2000);

    // Viral post chance (increases with level and viral boost upgrade)
    const baseViralChance = Math.min(user.followers / 10000, 0.1); // Up to 10% chance
    const viralChance = user.upgrades?.viralBoost ? baseViralChance + 0.1 : baseViralChance;

    if (Math.random() < viralChance && source === "Post Engagement") {
      setTimeout(() => {
        const viralBonus = Math.floor(Math.random() * 500) + 100;
        setUser(prev => ({ ...prev, followers: prev.followers + viralBonus }));

        const viralId = Date.now();
        setFollowerGains(prev => [...prev, { id: viralId, amount: viralBonus, source: "🔥 VIRAL!" }]);
        setTimeout(() => {
          setFollowerGains(prev => prev.filter(gain => gain.id !== viralId));
        }, 3000);

        triggerAchievement("Post Went Viral!", "🔥");
      }, 1000);
    }

    // Check for level up
    const newLevel = careerLevels.find(level => newFollowerCount >= level.min && newFollowerCount <= level.max);
    const currentLevelBefore = getCurrentLevel(user.followers);
    if (newLevel && newLevel !== currentLevelBefore) {
      setTimeout(() => {
        triggerAchievement(`Promoted to ${newLevel.title}!`, "🎉");
      }, 500);
    }

    // Check for achievements
    checkAchievements(newFollowerCount);
  }, [user.followers, user.combo, user.streak, user.upgrades, triggerAchievement, checkAchievements]);

  // Speed boost effect for visual feedback
  useEffect(() => {
    const currentSpeed = getSpeedMultiplier(user.followers, user.combo);
    setSpeedBoost(currentSpeed);
  }, [user.combo, user.followers]);

  return {
    user,
    setUser,
    posts,
    setPosts,
    achievements,
    followerGains,
    showAchievement,
    speedBoost,
    trendingTopics,
    setTrendingTopics,
    consumeEnergy,
    addCombo,
    addFollowers,
    triggerAchievement
  };
};