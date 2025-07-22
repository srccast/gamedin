import React from 'react';
import { Zap, Users, TrendingUp } from 'lucide-react';
import { getCurrentLevel, getNextLevel } from '../utils/gameUtils';

const Header = ({ 
  user, 
  speedBoost, 
  onShowUpgradeShop, 
  onShowLevelsModal 
}) => {
  const currentLevel = getCurrentLevel(user.followers);
  const nextLevel = getNextLevel(user.followers);
  const progressToNext = currentLevel === nextLevel ? 100 :
    ((user.followers - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">🎮</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">GamedIn</h1>
            <p className="text-xs text-gray-500">Professional Network Simulator</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
            <div className="flex items-center space-x-2">
              <Zap className={`w-5 h-5 ${user.energy > 5 ? 'text-yellow-500' : 'text-red-500'}`} />
              <span className="text-sm font-bold text-gray-800">{user.energy}/{user.maxEnergy}</span>
            </div>
            <button
              onClick={onShowUpgradeShop}
              className="text-xs bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md font-medium"
              title="Upgrade Shop"
            >
              🛒 Shop
            </button>
          </div>

          {/* Combo and Speed Indicators */}
          {user.combo > 0 && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full border border-orange-200 animate-pulse">
              <span className="text-orange-600 font-bold text-sm">🔥 {user.combo}x COMBO</span>
            </div>
          )}

          {speedBoost > 1 && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full border border-blue-200">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-bold text-sm">{speedBoost.toFixed(1)}x SPEED</span>
            </div>
          )}

          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-bold text-blue-800">{user.followers.toLocaleString()}</span>
            {user.upgrades?.autoEngagement && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">AUTO</span>
            )}
          </div>

          <div className="text-right">
            <button
              onClick={onShowLevelsModal}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <div>
                <div className={`text-sm font-semibold ${currentLevel.color} flex items-center space-x-1`}>
                  <span>{currentLevel.icon}</span>
                  <span>{currentLevel.title}</span>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;