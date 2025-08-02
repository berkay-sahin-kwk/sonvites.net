import React, { useState } from 'react';
import { Plus, Edit, Trash2, Car, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import VehicleCard from '../components/VehicleCard';
import VehicleForm from '../components/VehicleForm';

export default function MyGarage() {
  const { user } = useAuth();
  const { getVehiclesByUser, deleteVehicle } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  
  const userVehicles = getVehiclesByUser(user?.id || '');

  const handleDeleteVehicle = (vehicleId: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      deleteVehicle(vehicleId);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Garage</h1>
            <p className="text-gray-400">
              Manage your vehicle collection and showcase your rides
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Vehicle
          </button>
        </div>

        {/* Vehicle Form Modal */}
        {(showAddForm || editingVehicle) && (
          <VehicleForm
            vehicle={editingVehicle}
            onClose={() => {
              setShowAddForm(false);
              setEditingVehicle(null);
            }}
            onSave={() => {
              setShowAddForm(false);
              setEditingVehicle(null);
            }}
          />
        )}

        {/* Vehicles Grid */}
        {userVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userVehicles.map((vehicle) => (
              <div key={vehicle.id} className="relative group">
                <VehicleCard vehicle={vehicle} />
                
                {/* Edit/Delete Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingVehicle(vehicle)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <Car className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">Your garage is empty</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start building your digital garage by adding your vehicles. Share your rides, modifications, and connect with fellow enthusiasts.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium text-lg"
            >
              <Plus className="h-6 w-6 mr-3" />
              Add Your First Vehicle
            </button>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Tips for a Great Garage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Image className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-white mb-1">High-Quality Photos</h4>
                <p className="text-gray-400 text-sm">Use good lighting and multiple angles to showcase your vehicle's best features.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Edit className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-white mb-1">Detailed Descriptions</h4>
                <p className="text-gray-400 text-sm">Share the story behind your build, challenges faced, and future plans.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Car className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-white mb-1">List Modifications</h4>
                <p className="text-gray-400 text-sm">Help others learn about your setup by listing all modifications and upgrades.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}