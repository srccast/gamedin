import { careerLevels, allTopics } from '../data/gameData';

// Get current level based on follower count
export const getCurrentLevel = (followerCount) => {
  return careerLevels.find(level => followerCount >= level.min && followerCount <= level.max) || careerLevels[0];
};

// Get next level based on current follower count
export const getNextLevel = (followerCount) => {
  const currentLevel = getCurrentLevel(followerCount);
  const currentIndex = careerLevels.indexOf(currentLevel);
  return careerLevels[currentIndex + 1] || currentLevel;
};

// Get speed multiplier based on level and combo
export const getSpeedMultiplier = (followerCount, combo) => {
  const levelMultiplier = Math.floor(followerCount / 1000) * 0.5 + 1; // +0.5x per 1000 followers
  const comboMultiplier = Math.min(combo * 0.2 + 1, 3); // Max 3x from combo
  return levelMultiplier * comboMultiplier;
};

// Helper function to determine topic from template content
export const getTopicFromTemplate = (template) => {
  if (template.includes('AI') || template.includes('technology')) return allTopics.find(t => t.name === "AI & Technology");
  if (template.includes('remote') || template.includes('work-life')) return allTopics.find(t => t.name === "Remote Work");
  if (template.includes('leader') || template.includes('Leader')) return allTopics.find(t => t.name === "Leadership");
  if (template.includes('team') || template.includes('Team')) return allTopics.find(t => t.name === "Team Building");
  if (template.includes('networking') || template.includes('mentor')) return allTopics.find(t => t.name === "Mentorship");
  if (template.includes('growth') || template.includes('milestone') || template.includes('promoted')) return allTopics.find(t => t.name === "Career Growth");

  // Default random topic if no match
  return allTopics[Math.floor(Math.random() * allTopics.length)];
};

// Check if post topic aligns with trends
export const getTrendMultiplier = (postTopic, trendingTopics) => {
  if (!postTopic) return 0.5; // Poor performance if no topic match

  const isTrending = trendingTopics.some(trend => trend.name === postTopic.name);
  return isTrending ? 2.0 : 0.6; // 2x if trending, 0.6x if not
};

// Check if upgrade is available
export const canPurchaseUpgrade = (upgrade, user) => {
  const currentLevel = getCurrentLevel(user.followers);
  const levelIndex = careerLevels.findIndex(l => l.title === currentLevel.title);
  const requiredLevelIndex = careerLevels.findIndex(l => l.title === upgrade.unlockLevel);

  return levelIndex >= requiredLevelIndex &&
         user.energy >= upgrade.cost &&
         (upgrade.repeatable || !user.upgrades?.[upgrade.id]);
};

// Format remaining cooldown time
export const formatCooldownTime = (lastPostTime, postCooldown) => {
  const now = Date.now();
  const remaining = postCooldown - (now - lastPostTime);
  const seconds = Math.max(0, remaining / 1000);

  if (seconds < 1) {
    return `${Math.ceil(seconds * 10) / 10}s`; // Show decimal for sub-second times
  }
  return `${Math.ceil(seconds)}s`;
};

// Check if user can post (cooldown check)
export const canCreatePost = (lastPostTime, postCooldown) => {
  const now = Date.now();
  return now - lastPostTime >= postCooldown;
};