import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Car, Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import VehicleCard from '../components/VehicleCard';

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { getVehiclesByUser } = useData();
  
  // For demo purposes, we'll use mock user data
  const user = {
    id: userId,
    username: 'johndoe',
    fullName: 'John Doe',
    bio: 'Car enthusiast with a passion for classic muscle cars and modern supercars. Always working on something new in the garage.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2024-01-15',
    location: 'Los Angeles, CA',
    followers: ['2', '3'],
    following: ['2']
  };

  const userVehicles = getVehiclesByUser(userId || '');
  const isOwnProfile = currentUser?.id === userId;

  const stats = {
    vehicles: userVehicles.length,
    totalLikes: userVehicles.reduce((sum, vehicle) => sum + vehicle.likes.length, 0),
    totalComments: userVehicles.reduce((sum, vehicle) => sum + vehicle.comments.length, 0),
    followers: user.followers.length,
    following: user.following.length
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
            />

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{user.fullName}</h1>
                  <p className="text-gray-400 text-lg">@{user.username}</p>
                </div>
                
                {!isOwnProfile && (
                  <button className="mt-4 sm:mt-0 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium">
                    Follow
                  </button>
                )}
              </div>

              <p className="text-gray-300 mb-6 max-w-2xl">{user.bio}</p>

              {/* User Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{stats.followers} followers • {stats.following} following</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Car className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="text-2xl font-bold text-white">{stats.vehicles}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Vehicles</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-2xl font-bold text-white">{stats.totalLikes}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-2xl font-bold text-white">{stats.totalComments}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Comments</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-2xl font-bold text-white">{stats.followers}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's Vehicles */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {isOwnProfile ? 'My Vehicles' : `${user.fullName}'s Garage`}
          </h2>
          
          {userVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Car className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {isOwnProfile ? 'No vehicles yet' : 'No vehicles shared'}
              </h3>
              <p className="text-gray-500">
                {isOwnProfile 
                  ? 'Add your first vehicle to get started!' 
                  : `${user.fullName} hasn't shared any vehicles yet.`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}