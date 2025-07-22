import React, { useEffect } from 'react';

const CreatePostModal = ({ 
  isOpen, 
  onClose, 
  postOptions, 
  trendingTopics, 
  onCreatePost 
}) => {
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Post Topic</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-800 font-medium mb-2">
            📈 <strong>Strategy Tip:</strong> Posts about trending topics get 2x engagement!
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-purple-600">Currently trending:</span>
            {trendingTopics.map((topic, index) => (
              <span key={index} className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                {topic.emoji} {topic.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {postOptions.map((option, index) => {
            const isTrending = trendingTopics.some(trend => trend.name === option.topic?.name);
            return (
              <button
                key={index}
                onClick={() => onCreatePost(option.category, option.template, option.topic)}
                className={`w-full text-left p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                  isTrending 
                    ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 shadow-md' 
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.topic?.emoji || "📝"}</span>
                    <div>
                      <span className="font-bold text-gray-800 text-lg">{option.topic?.name || "General"}</span>
                      {isTrending && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full font-bold animate-pulse">
                            🔥 TRENDING
                          </span>
                          <span className="text-xs text-purple-700 font-semibold">+100% engagement</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium">
                    {option.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {option.template.substring(0, 200)}
                  {option.template.length > 200 ? '...' : ''}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    Expected engagement: {isTrending ? 'Very High 📈' : 'Moderate 📊'}
                  </div>
                  <div className="text-xs text-blue-600 font-semibold">
                    Click to post →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;