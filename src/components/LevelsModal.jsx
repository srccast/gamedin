import React, { useEffect } from 'react';
import { X, Users, TrendingUp } from 'lucide-react';
import { careerLevels } from '../data/gameData';
import { getCurrentLevel, getNextLevel } from '../utils/gameUtils';

const LevelsModal = ({ isOpen, onClose, user }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentLevel = getCurrentLevel(user.followers);
  const nextLevel = getNextLevel(user.followers);
  const progressToNext = currentLevel === nextLevel ? 100 :
    ((user.followers - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span>Career Progression</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Current Progress */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{currentLevel.icon}</span>
                <div>
                  <h3 className={`text-xl font-bold ${currentLevel.color}`}>
                    {currentLevel.title}
                  </h3>
                  <p className="text-gray-600">{currentLevel.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">{user.followers.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500">followers</p>
              </div>
            </div>

            {currentLevel !== nextLevel && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to {nextLevel.title}</span>
                  <span>{Math.round(progressToNext)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {(nextLevel.min - user.followers).toLocaleString()} more followers needed
                </p>
              </div>
            )}

            <div className="mt-4 p-3 bg-white rounded-lg border">
              <p className="text-sm font-medium text-gray-700">💡 Prestige Bonus</p>
              <p className="text-sm text-gray-600">{currentLevel.prestigeBonus}</p>
            </div>
          </div>

          {/* All Levels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">All Career Levels</h3>
            {careerLevels.map((level, index) => {
              const isCurrentLevel = level.title === currentLevel.title;
              const isUnlocked = user.followers >= level.min;
              const isCompleted = user.followers > level.max && level.max !== 999999;

              return (
                <div
                  key={level.title}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCurrentLevel
                      ? 'border-blue-500 bg-blue-50'
                      : isUnlocked
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{level.icon}</span>
                      <div>
                        <h4 className={`font-semibold ${level.color} flex items-center space-x-2`}>
                          <span>{level.title}</span>
                          {isCurrentLevel && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                              CURRENT
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                              COMPLETED
                            </span>
                          )}
                          {!isUnlocked && (
                            <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded-full">
                              LOCKED
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {level.min.toLocaleString()} - {level.max === 999999 ? '∞' : level.max.toLocaleString()} followers
                      </p>
                      <p className="text-xs text-gray-500">{level.prestigeBonus}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelsModal;