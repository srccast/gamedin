import React, { useEffect } from 'react';
import { X, Trophy, Users, TrendingUp } from 'lucide-react';

const VictoryModal = ({ isOpen, onClose, user }) => {
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

  const formatCompletionTime = (startTime, endTime) => {
    if (!endTime || !startTime) return "Unknown";
    
    const durationMs = endTime - startTime;
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  if (!isOpen) return null;

  const completionTime = formatCompletionTime(user.gameStartTime, user.gameCompletionTime);
  
  const stats = [
    { label: 'Total Followers', value: user.followers.toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Completion Time', value: completionTime, icon: '⏱️', color: 'text-orange-600' },
    { label: 'Posts Created', value: user.totalPosts.toLocaleString(), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Likes Given', value: user.totalLikes.toLocaleString(), icon: '❤️', color: 'text-red-600' },
    { label: 'Comments Made', value: user.totalComments.toLocaleString(), icon: '💬', color: 'text-purple-600' },
  ];

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
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header with celebration */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-2">
              <div className="bg-white/20 p-3 rounded-full animate-bounce">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">🎉 CONGRATULATIONS! 🎉</h1>
            <p className="text-sm text-white/90">Global Influence Achieved!</p>
            <div className="flex justify-center space-x-2 mt-2 text-lg">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🌍</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🥳</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
              <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🚀</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💎</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Achievement Message */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Global Domination Complete! 
            </h2>
            <p className="text-sm text-gray-600">
              You've connected with every human on Earth! From 47 followers to 8+ billion - 
              an incredible networking achievement!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-4">
            {/* Completion Time - Featured */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg text-center border border-orange-200 mb-3">
              <div className="flex justify-center mb-2">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">{completionTime}</div>
              <div className="text-sm text-orange-700 font-medium">Total Time to Victory</div>
            </div>
            
            {/* Other Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.slice(0, 1).concat(stats.slice(2)).map((stat, index) => (
                <div key={stat.label} className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="flex justify-center mb-1">
                    {typeof stat.icon === 'string' ? (
                      <span className="text-lg">{stat.icon}</span>
                    ) : (
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    )}
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg mb-3">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center space-x-2 text-sm">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Final Achievements</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-1 text-xs">
                <span>🌍</span>
                <span>Global Domination</span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <span>🏆</span>
                <span>Networking God</span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <span>🚀</span>
                <span>Viral Legend</span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <span>💎</span>
                <span>Earth's CEO</span>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-3">
              From 47 to 8 billion followers in {completionTime} - you've conquered the ultimate networking challenge!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800 font-medium">
                🎮 Want to play again? Refresh the page to start over!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;