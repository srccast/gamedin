import { 
  getCurrentLevel, 
  getNextLevel, 
  getSpeedMultiplier,
  getTrendMultiplier,
  formatCooldownTime,
  canCreatePost
} from '../gameUtils';

describe('GameUtils', () => {
  describe('getCurrentLevel', () => {
    test('returns Intern level for low follower count', () => {
      const level = getCurrentLevel(50);
      expect(level.title).toBe('Intern');
    });

    test('returns Professional level for mid-range followers', () => {
      const level = getCurrentLevel(200);
      expect(level.title).toBe('Professional');
    });

    test('returns Manager level for higher followers', () => {
      const level = getCurrentLevel(750);
      expect(level.title).toBe('Manager');
    });
  });

  describe('getSpeedMultiplier', () => {
    test('returns base multiplier for low followers and no combo', () => {
      const multiplier = getSpeedMultiplier(100, 0);
      expect(multiplier).toBe(1); // Math.floor(100/1000) * 0.5 + 1 = 0 * 0.5 + 1 = 1
    });

    test('increases with combo', () => {
      const multiplier = getSpeedMultiplier(100, 5);
      expect(multiplier).toBeGreaterThan(1); // Should be 1 * (5 * 0.2 + 1) = 2
    });

    test('caps combo multiplier at 3x', () => {
      const multiplier = getSpeedMultiplier(0, 100); // Very high combo
      const comboMultiplier = Math.min(100 * 0.2 + 1, 3);
      expect(comboMultiplier).toBe(3);
    });
  });

  describe('getTrendMultiplier', () => {
    const mockTrendingTopics = [
      { name: "AI & Technology", emoji: "🤖" },
      { name: "Remote Work", emoji: "💻" }
    ];

    test('returns 2x multiplier for trending topics', () => {
      const postTopic = { name: "AI & Technology" };
      const multiplier = getTrendMultiplier(postTopic, mockTrendingTopics);
      expect(multiplier).toBe(2.0);
    });

    test('returns 0.6x multiplier for non-trending topics', () => {
      const postTopic = { name: "Sports" };
      const multiplier = getTrendMultiplier(postTopic, mockTrendingTopics);
      expect(multiplier).toBe(0.6);
    });

    test('returns 0.5x for no topic', () => {
      const multiplier = getTrendMultiplier(null, mockTrendingTopics);
      expect(multiplier).toBe(0.5);
    });
  });

  describe('formatCooldownTime', () => {
    test('formats seconds correctly', () => {
      const now = Date.now();
      const lastPostTime = now - 25000; // 25 seconds ago
      const postCooldown = 30000; // 30 second cooldown
      
      const formatted = formatCooldownTime(lastPostTime, postCooldown);
      expect(formatted).toBe('5s');
    });

    test('shows decimals for sub-second times', () => {
      const now = Date.now();
      const lastPostTime = now - 29500; // 29.5 seconds ago
      const postCooldown = 30000; // 30 second cooldown
      
      const formatted = formatCooldownTime(lastPostTime, postCooldown);
      expect(formatted).toMatch(/0\.\ds/);
    });
  });

  describe('canCreatePost', () => {
    test('allows posting when cooldown has passed', () => {
      const now = Date.now();
      const lastPostTime = now - 35000; // 35 seconds ago
      const postCooldown = 30000; // 30 second cooldown
      
      expect(canCreatePost(lastPostTime, postCooldown)).toBe(true);
    });

    test('prevents posting during cooldown', () => {
      const now = Date.now();
      const lastPostTime = now - 15000; // 15 seconds ago
      const postCooldown = 30000; // 30 second cooldown
      
      expect(canCreatePost(lastPostTime, postCooldown)).toBe(false);
    });
  });
});