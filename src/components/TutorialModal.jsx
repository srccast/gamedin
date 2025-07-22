import React, { useEffect } from 'react';
import { X, Users, Zap, TrendingUp, Trophy, MousePointer } from 'lucide-react';

const TutorialModal = ({ isOpen, onClose }) => {
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to GamedIn!</h1>
          <p className="text-blue-100">Professional Network Simulator</p>
        </div>

        <div className="p-6">
          {/* Game Objective */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
              <span>🎯</span>
              <span>Your Mission</span>
            </h2>
            <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">
              Build the ultimate professional network! Start with 47 followers and grow to 
              reach <strong>8 billion followers</strong> (everyone on Earth). Master the art of 
              networking through strategic engagement and content creation.
            </p>
          </div>

          {/* Game Mechanics */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🎮 How to Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MousePointer className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Engage with Posts</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>👍 <strong>Like</strong> posts (1 energy)</li>
                  <li>💬 <strong>Comment</strong> (2 energy)</li>
                  <li>🔄 <strong>Share</strong> posts (1 energy)</li>
                  <li>Each action gains followers!</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-800">Create Content</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✍️ Write posts (3 energy)</li>
                  <li>📈 Follow trending topics for 2x engagement</li>
                  <li>⏰ Wait for cooldown between posts</li>
                  <li>🚀 Posts can go viral!</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-800">Energy System</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>⚡ All actions cost energy</li>
                  <li>🔋 Gain energy by earning followers</li>
                  <li>📊 Higher levels = more energy per follower</li>
                  <li>🛒 Buy upgrades in the shop</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Career Growth</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>📝 Start as Intern (0-100 followers)</li>
                  <li>💼 Advance to Professional, Manager, etc.</li>
                  <li>👑 Reach C-Suite executive status</li>
                  <li>💎 Ultimate goal: Global influence!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <span>💡</span>
              <span>Pro Tips</span>
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Combo System:</strong> Perform actions quickly in succession for bonus followers</li>
              <li>• <strong>Trending Topics:</strong> Posts about trending topics get 2x engagement</li>
              <li>• <strong>Upgrades:</strong> Spend energy on upgrades for permanent benefits</li>
              <li>• <strong>Strategy:</strong> Balance energy spending between actions and upgrades</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              🚀 Start Your Journey
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Good luck building your professional empire!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;