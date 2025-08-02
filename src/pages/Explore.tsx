import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Heart } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import VehicleCard from '../components/VehicleCard';

export default function Explore() {
  const { vehicles } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterMake, setFilterMake] = useState('');

  // Get unique makes for filter
  const uniqueMakes = Array.from(new Set(vehicles.map(v => v.make))).sort();

  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchesSearch = searchTerm === '' || 
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = filterMake === '' || vehicle.make === filterMake;
      
      return matchesSearch && matchesMake;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.likes.length - a.likes.length;
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Garages</h1>
          <p className="text-gray-400">
            Discover amazing builds from the community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles, makes, models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterMake}
                  onChange={(e) => setFilterMake(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none min-w-[140px]"
                >
                  <option value="">All Makes</option>
                  {uniqueMakes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none min-w-[140px]"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="year">Newest Cars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Results Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
              {searchTerm && ` for "${searchTerm}"`}
              {filterMake && ` • ${filterMake} only`}
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-400">
                {sortBy === 'recent' && <Clock className="h-4 w-4" />}
                {sortBy === 'popular' && <Heart className="h-4 w-4" />}
                {sortBy === 'year' && <TrendingUp className="h-4 w-4" />}
                <span>
                  {sortBy === 'recent' && 'Latest First'}
                  {sortBy === 'popular' && 'Most Liked'}
                  {sortBy === 'year' && 'Newest Cars'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterMake 
                ? 'Try adjusting your search or filters'
                : 'No vehicles have been shared yet'
              }
            </p>
            {(searchTerm || filterMake) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterMake('');
                }}
                className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}