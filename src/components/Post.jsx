import React from 'react';
import { Heart, MessageCircle, Share2, Star } from 'lucide-react';

const Post = ({ 
  post, 
  user, 
  onLike, 
  onComment, 
  onShare 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">
            {post.author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{post.author}</h3>
            {post.author === user.name && <Star className="w-4 h-4 text-yellow-500" />}
          </div>
          <p className="text-sm text-gray-600">{post.role} • {post.timeAgo}</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

      <div className="flex items-center justify-between border-t pt-3">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike(post.id)}
            disabled={post.liked || user.energy < 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
              post.liked 
                ? 'text-red-600 bg-red-100 shadow-md' 
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50 hover:shadow-md'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            disabled={post.commented || user.energy < 2}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
              post.commented 
                ? 'text-blue-600 bg-blue-100 shadow-md' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button
            onClick={() => onShare(post.id)}
            disabled={user.energy < 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>

        <div className="text-xs text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full font-medium shadow-sm">
          {post.category}
        </div>
      </div>
    </div>
  );
};

export default Post;