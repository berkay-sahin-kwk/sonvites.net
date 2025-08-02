import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Vehicle } from '../contexts/DataContext';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const { user } = useAuth();
  const { likeVehicle, addComment } = useData();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const isLiked = vehicle.likes.includes(user?.id || '');
  const formattedDate = new Date(vehicle.createdAt).toLocaleDateString();

  const handleLike = () => {
    if (user) {
      likeVehicle(vehicle.id, user.id);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newComment.trim()) {
      addComment(vehicle.id, user.id, user.username, user.avatar, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
      {/* Vehicle Image */}
      <div className="relative aspect-video">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full">
          <span className="text-yellow-400 font-semibold text-sm">
            {vehicle.year}
          </span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-gray-400 text-sm flex items-center">
              <User className="h-4 w-4 mr-1" />
              Owner ID: {vehicle.userId}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-400">Engine</p>
            <p className="text-white font-medium">{vehicle.engine}</p>
          </div>
          <div>
            <p className="text-gray-400">Drivetrain</p>
            <p className="text-white font-medium">{vehicle.drivetrain}</p>
          </div>
        </div>

        {/* Modifications */}
        {vehicle.modifications.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">Key Modifications</p>
            <div className="flex flex-wrap gap-2">
              {vehicle.modifications.slice(0, 3).map((mod, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-yellow-400 rounded-md text-xs"
                >
                  {mod}
                </span>
              ))}
              {vehicle.modifications.length > 3 && (
                <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-md text-xs">
                  +{vehicle.modifications.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {vehicle.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{vehicle.likes.length}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{vehicle.comments.length}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-800 pt-4">
            {/* Comment Form */}
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {vehicle.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className="h-6 w-6 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-white">
                        {comment.username}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}