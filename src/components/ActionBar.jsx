import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { useCooldownTimer } from '../hooks/useCooldownTimer';

const ActionBar = ({ 
  user, 
  trendingTopics, 
  speedBoost,
  onCreatePost,
  onBatchLike 
}) => {
  const { canPost, remainingTime } = useCooldownTimer(user.lastPostTime, user.postCooldown);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onCreatePost}
            disabled={user.energy < (user.upgrades?.energyEfficiency ? 2 : 3) || !canPost}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>
              {canPost
                ? `Create Post (${user.upgrades?.energyEfficiency ? 2 : 3} ⚡)`
                : `Cooldown: ${remainingTime}`
              }
            </span>
          </button>

          {/* Batch Actions - Requires upgrade purchase */}
          {user.upgrades?.batchActions && (
            <button
              onClick={onBatchLike}
              disabled={user.energy < 2}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Heart className="w-4 h-4" />
              <span>Batch Like ({user.upgrades?.energyEfficiency ? 1 : 1}⚡ each)</span>
            </button>
          )}

          <div className="text-sm text-gray-600">
            Gain energy by earning followers • Like ({user.upgrades?.energyEfficiency ? 1 : 1}⚡) • Comment ({user.upgrades?.energyEfficiency ? 1 : 2}⚡) • Share ({user.upgrades?.energyEfficiency ? 1 : 1}⚡)
            {user.combo > 0 && <span className="text-orange-600 font-semibold"> • {user.combo}x COMBO ACTIVE!</span>}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{user.totalPosts} posts</span>
          <span>{user.totalLikes} likes given</span>
          <span>{user.totalComments} comments</span>
          {user.streak > 0 && <span className="text-green-600 font-semibold">🔥 {user.streak} streak</span>}
        </div>
      </div>

      {/* Trending Topics Display */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-xl border border-purple-200 shadow-md">
        <h3 className="text-sm font-bold text-purple-800 mb-3 flex items-center">
          <span className="mr-2">🔥</span>
          Trending Now 
          <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded-full">2x engagement</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <span className="text-lg">{topic.emoji}</span>
              <span className="text-sm font-semibold text-gray-700">{topic.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Speed boost notification */}
      {speedBoost > 1.5 && (
        <div className="mt-3 p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-yellow-800 font-medium">
            🚀 You're on fire! {speedBoost.toFixed(1)}x speed multiplier active - actions generate more followers!
          </p>
        </div>
      )}
    </div>
  );
};

export default ActionBar;