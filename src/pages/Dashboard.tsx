import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Users, Car, Heart, MessageCircle, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import VehicleCard from '../components/VehicleCard';

export default function Dashboard() {
  const { user } = useAuth();
  const { vehicles, getVehiclesByUser } = useData();
  
  const userVehicles = getVehiclesByUser(user?.id || '');
  const recentVehicles = vehicles.slice(0, 6);
  
  const stats = {
    totalVehicles: userVehicles.length,
    totalLikes: userVehicles.reduce((sum, vehicle) => sum + vehicle.likes.length, 0),
    totalComments: userVehicles.reduce((sum, vehicle) => sum + vehicle.comments.length, 0),
    profileViews: 156 // Mock data
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-400">
            Ready to showcase your latest build or explore amazing garages?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">My Vehicles</p>
                <p className="text-2xl font-bold text-white">{stats.totalVehicles}</p>
              </div>
              <Car className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Likes</p>
                <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Comments</p>
                <p className="text-2xl font-bold text-white">{stats.totalComments}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Profile Views</p>
                <p className="text-2xl font-bold text-white">{stats.profileViews}</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/my-garage"
              className="flex items-center justify-center p-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Vehicle
            </Link>
            
            <Link
              to="/explore"
              className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore Garages
            </Link>
            
            <Link
              to={`/profile/${user?.id}`}
              className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
            >
              <Users className="h-5 w-5 mr-2" />
              View My Profile
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Latest from the Community</h2>
            <Link
              to="/explore"
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
            >
              View All
            </Link>
          </div>
          
          {recentVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No vehicles yet</h3>
              <p className="text-gray-500 mb-4">Be the first to share your ride with the community!</p>
              <Link
                to="/my-garage"
                className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Vehicle
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}