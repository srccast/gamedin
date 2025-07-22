import React, { useState, useEffect, useCallback } from 'react';
import { Trophy } from 'lucide-react';

// Components
import Header from './Header';
import ActionBar from './ActionBar';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LevelsModal from './LevelsModal';
import UpgradeShopModal from './UpgradeShopModal';
import VictoryModal from './VictoryModal';
import TutorialModal from './TutorialModal';

// Hooks and Utils
import { useGameState } from '../hooks/useGameState';
import { getTopicFromTemplate, getTrendMultiplier, canPurchaseUpgrade, getSpeedMultiplier } from '../utils/gameUtils';

// Data
import { 
  contentTemplates, 
  allTopics, 
  simulatedUsers, 
  autoPostContent, 
  initialPosts
} from '../data/gameData';

const GamedIn = () => {
  const {
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
  } = useGameState();

  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showLevelsModal, setShowLevelsModal] = useState(false);
  const [showUpgradeShop, setShowUpgradeShop] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [availablePostOptions, setAvailablePostOptions] = useState([]);

  // Initialize trending topics
  useEffect(() => {
    const selectTrendingTopics = () => {
      const shuffled = [...allTopics].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    };

    setTrendingTopics(selectTrendingTopics());

    // Change trends every 2 minutes
    const interval = setInterval(() => {
      setTrendingTopics(selectTrendingTopics());
    }, 120000);

    return () => clearInterval(interval);
  }, [setTrendingTopics]);

  // Initialize posts
  useEffect(() => {
    setPosts(initialPosts);
  }, [setPosts]);

  // Show tutorial on first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('gamedInTutorialSeen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  // Auto-generate new posts
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
      const randomContent = autoPostContent[Math.floor(Math.random() * autoPostContent.length)];
      const randomLikes = Math.floor(Math.random() * 200) + 20;
      const randomComments = Math.floor(Math.random() * 50) + 5;
      const randomShares = Math.floor(Math.random() * 30) + 2;

      const newAutoPost = {
        id: Date.now() + Math.random(),
        author: randomUser.name,
        role: randomUser.role,
        content: randomContent,
        likes: randomLikes,
        comments: randomComments,
        shares: randomShares,
        timeAgo: "now",
        liked: false,
        commented: false,
        category: "Auto-Generated"
      };

      setPosts(prev => [newAutoPost, ...prev.slice(0, 19)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [setPosts]);

  // Auto-engagement system (requires upgrade purchase)
  useEffect(() => {
    if (user.upgrades && user.upgrades.autoEngagement) {
      const interval = setInterval(() => {
        const autoLikes = Math.floor(user.followers / 1000) + 1;
        if (autoLikes > 0) {
          addFollowers(autoLikes, "Auto-Engagement");
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user.upgrades?.autoEngagement, user.followers, addFollowers]);

  // Check for victory condition (reaching Earth's population - 8 billion followers)
  useEffect(() => {
    if (user.followers >= 8000000000 && !showVictoryModal && !user.gameCompletionTime) {
      const completionTime = Date.now();
      
      // Record completion time
      setUser(prev => ({
        ...prev,
        gameCompletionTime: completionTime
      }));
      
      setTimeout(() => {
        setShowVictoryModal(true);
        triggerAchievement("Victory! Global Domination Achieved!", "🌍");
      }, 2000); // Delay to let the level-up animation play
    }
  }, [user.followers, showVictoryModal, user.gameCompletionTime, setUser, triggerAchievement]);

  // Generate 3 random post options when modal opens
  const generatePostOptions = useCallback(() => {
    const allContentArray = Object.entries(contentTemplates).flatMap(([category, templates]) =>
      templates.map(template => ({ category, template, topic: getTopicFromTemplate(template) }))
    );

    const shuffled = [...allContentArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  // Like post with momentum
  const likePost = useCallback((postId) => {
    if (!consumeEnergy(1)) return;

    addCombo();
    
    // Calculate follower gain once to avoid duplicates
    const followerGain = Math.floor(Math.random() * 3) + 1;
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId && !post.liked) {
        const newLikes = post.likes + 1;
        setUser(prev => ({ ...prev, totalLikes: prev.totalLikes + 1 }));
        return { ...post, likes: newLikes, liked: true };
      }
      return post;
    }));
    
    // Call addFollowers only once after state updates
    addFollowers(followerGain, "Like");
  }, [consumeEnergy, addCombo, setPosts, addFollowers, setUser]);

  // Comment on post with momentum
  const commentPost = useCallback((postId) => {
    if (!consumeEnergy(2)) return;

    addCombo();
    
    // Calculate follower gain once to avoid duplicates
    const followerGain = Math.floor(Math.random() * 6) + 3;
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId && !post.commented) {
        const newComments = post.comments + 1;
        setUser(prev => ({ ...prev, totalComments: prev.totalComments + 1 }));
        return { ...post, comments: newComments, commented: true };
      }
      return post;
    }));
    
    // Call addFollowers only once after state updates
    addFollowers(followerGain, "Comment");
  }, [consumeEnergy, addCombo, setPosts, addFollowers, setUser]);

  // Share post with momentum
  const sharePost = useCallback((postId) => {
    if (!consumeEnergy(1)) return;

    addCombo();
    
    // Calculate follower gain once to avoid duplicates
    const followerGain = Math.floor(Math.random() * 4) + 2;
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newShares = post.shares + 1;
        return { ...post, shares: newShares };
      }
      return post;
    }));
    
    // Call addFollowers only once after state updates
    addFollowers(followerGain, "Share");
  }, [consumeEnergy, addCombo, setPosts, addFollowers]);

  // Batch like (requires upgrade purchase)
  const batchLike = useCallback(() => {
    if (!user.upgrades?.batchActions) return;

    const unlikedPosts = posts.filter(post => !post.liked);
    const canLike = Math.min(unlikedPosts.length, Math.floor(user.energy / 1), 5);

    if (canLike === 0 || !consumeEnergy(canLike)) return;

    addCombo();
    
    // Calculate total follower gain once to avoid duplicates
    const totalFollowerGain = canLike * (Math.floor(Math.random() * 3) + 1);
    let likesProcessed = 0;

    setPosts(prev => prev.map(post => {
      if (!post.liked && likesProcessed < canLike) {
        likesProcessed++;
        return { ...post, likes: post.likes + 1, liked: true };
      }
      return post;
    }));

    // Call addFollowers only once after state updates
    addFollowers(totalFollowerGain, `Batch Like x${canLike}`);
    setUser(prev => ({ ...prev, totalLikes: prev.totalLikes + canLike }));
  }, [user.upgrades?.batchActions, posts, user.energy, consumeEnergy, addCombo, setPosts, addFollowers, setUser]);

  const handleCreatePost = () => {
    setAvailablePostOptions(generatePostOptions());
    setShowNewPostModal(true);
  };

  const handleTutorialClose = () => {
    localStorage.setItem('gamedInTutorialSeen', 'true');
    setShowTutorial(false);
  };

  // Create new post with accelerated mechanics and cooldown
  const createPost = useCallback((category, content, postTopic) => {
    const now = Date.now();
    if (now - user.lastPostTime < user.postCooldown) return; // Cooldown check
    if (!consumeEnergy(3)) return;

    addCombo();
    const newPost = {
      id: Date.now(),
      author: user.name,
      role: "Professional", // You could get this from getCurrentLevel(user.followers).title if needed
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      timeAgo: "now",
      liked: false,
      commented: false,
      category,
      topic: postTopic
    };

    setPosts(prev => [newPost, ...prev]);
    setUser(prev => ({
      ...prev,
      totalPosts: prev.totalPosts + 1,
      lastPostTime: now
    }));

    // Accelerated engagement simulation based on level and trends
    const engagementSpeed = Math.max(500, 2000 - (user.followers / 10)); // Faster with more followers

    setTimeout(() => {
      const speedMultiplier = getSpeedMultiplier(user.followers, user.combo);
      const trendMultiplier = getTrendMultiplier(postTopic, trendingTopics);

      const randomLikes = Math.floor((Math.random() * 50 + 10) * speedMultiplier * trendMultiplier);
      const randomComments = Math.floor((Math.random() * 20 + 5) * speedMultiplier * trendMultiplier);
      const followerGain = Math.floor((Math.random() * 46 + 5) * speedMultiplier * trendMultiplier);

      setPosts(prev => prev.map(post =>
        post.id === newPost.id
          ? { ...post, likes: randomLikes, comments: randomComments }
          : post
      ));

      const trendBonus = trendMultiplier > 1 ? " (Trending!)" : trendMultiplier < 1 ? " (Off-trend)" : "";
      addFollowers(followerGain, `Post Engagement${trendBonus}`);
    }, engagementSpeed);

    setShowNewPostModal(false);
  }, [user.lastPostTime, user.postCooldown, user.followers, user.combo, user.name, consumeEnergy, addCombo, setPosts, setUser, addFollowers, trendingTopics]);

  // Purchase upgrade functionality
  const purchaseUpgrade = useCallback((upgrade) => {
    if (!canPurchaseUpgrade(upgrade, user)) return;

    // Deduct energy cost
    if (!consumeEnergy(upgrade.cost)) return;

    setUser(prev => {
      const newUpgrades = { ...prev.upgrades };
      
      if (upgrade.repeatable) {
        // For repeatable upgrades, increment the count
        newUpgrades[upgrade.id] = (newUpgrades[upgrade.id] || 0) + 1;
      } else {
        // For one-time upgrades, set to true
        newUpgrades[upgrade.id] = true;
      }

      // Apply specific upgrade effects
      let newState = { ...prev, upgrades: newUpgrades };

      switch (upgrade.id) {
        case 'maxEnergy':
          newState.maxEnergy = prev.maxEnergy + 10;
          break;
        case 'fastPosting':
          newState.postCooldown = Math.max(5000, prev.postCooldown - 5000); // Min 5 seconds
          break;
        case 'ultraFastPosting':
          newState.postCooldown = Math.max(2500, prev.postCooldown / 2); // Halve cooldown, min 2.5 seconds
          break;
        case 'speedMultiplier':
          newState.upgrades.speedMultiplier = (newState.upgrades.speedMultiplier || 1) + 0.5;
          break;
        default:
          // Other upgrades (batchActions, autoEngagement, viralBoost, energyEfficiency) 
          // are handled by their boolean state
          break;
      }

      return newState;
    });

    // Show success message
    triggerAchievement(`Purchased ${upgrade.name}!`, upgrade.icon);
  }, [user, consumeEnergy, setUser, triggerAchievement]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        user={user}
        speedBoost={speedBoost}
        onShowUpgradeShop={() => setShowUpgradeShop(true)}
        onShowLevelsModal={() => setShowLevelsModal(true)}
      />

      {/* Floating follower gains */}
      {followerGains.map((gain, index) => (
        <div
          key={gain.id}
          className={`fixed right-8 bg-gradient-to-r text-white px-4 py-3 rounded-lg shadow-2xl animate-bounce z-50 font-bold ${
            gain.source.includes('VIRAL') 
              ? 'from-red-500 to-pink-500 text-xl' 
              : gain.source.includes('speed') || gain.source.includes('combo')
                ? 'from-orange-500 to-yellow-500'
                : 'from-green-500 to-emerald-500'
          }`}
          style={{
            top: `${80 + index * 80}px`,
            animationDuration: gain.source.includes('VIRAL') ? '0.3s' : '0.5s'
          }}
        >
          {gain.source.includes('VIRAL') && <span className="mr-2">🔥</span>}
          {gain.source.includes('speed') && <span className="mr-2">🚀</span>}
          {gain.source.includes('combo') && <span className="mr-2">⚡</span>}
          +{gain.amount} followers!
          {gain.fractionalEnergyGain > 0 && (
            <div className="text-xs opacity-90 mt-1">
              +{gain.fractionalEnergyGain.toFixed(1)} energy ⚡
            </div>
          )}
          {gain.source && (
            <div className="text-xs opacity-90 mt-1">
              {gain.source}
            </div>
          )}
        </div>
      ))}

      {/* Achievement notification */}
      {showAchievement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-6 py-4 rounded-lg shadow-2xl z-50 animate-pulse">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8" />
            <div>
              <div className="font-bold text-lg">Achievement Unlocked!</div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{showAchievement.icon}</span>
                <span>{showAchievement.title}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <ActionBar 
          user={user}
          trendingTopics={trendingTopics}
          speedBoost={speedBoost}
          onCreatePost={handleCreatePost}
          onBatchLike={batchLike}
        />

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <Post 
              key={post.id}
              post={post}
              user={user}
              onLike={likePost}
              onComment={commentPost}
              onShare={sharePost}
            />
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
        postOptions={availablePostOptions}
        trendingTopics={trendingTopics}
        onCreatePost={createPost}
      />

      {/* Levels Modal */}
      <LevelsModal
        isOpen={showLevelsModal}
        onClose={() => setShowLevelsModal(false)}
        user={user}
      />

      {/* Upgrade Shop Modal */}
      <UpgradeShopModal
        isOpen={showUpgradeShop}
        onClose={() => setShowUpgradeShop(false)}
        user={user}
        onPurchaseUpgrade={purchaseUpgrade}
      />

      {/* Victory Modal */}
      <VictoryModal
        isOpen={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        user={user}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={showTutorial}
        onClose={handleTutorialClose}
      />
    </div>
  );
};

export default GamedIn;