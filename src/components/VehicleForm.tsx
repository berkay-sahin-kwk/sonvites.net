import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

interface VehicleFormProps {
  vehicle?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function VehicleForm({ vehicle, onClose, onSave }: VehicleFormProps) {
  const { user } = useAuth();
  const { addVehicle, updateVehicle } = useData();
  
  const [formData, setFormData] = useState({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    color: vehicle?.color || '',
    engine: vehicle?.engine || '',
    transmission: vehicle?.transmission || '',
    drivetrain: vehicle?.drivetrain || '',
    description: vehicle?.description || '',
    modifications: vehicle?.modifications || [],
    images: vehicle?.images || []
  });

  const [newModification, setNewModification] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addModification = () => {
    if (newModification.trim()) {
      setFormData(prev => ({
        ...prev,
        modifications: [...prev.modifications, newModification.trim()]
      }));
      setNewModification('');
    }
  };

  const removeModification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      modifications: prev.modifications.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (vehicle) {
      updateVehicle(vehicle.id, formData);
    } else {
      addVehicle({
        ...formData,
        userId: user.id,
        year: Number(formData.year)
      });
    }
    
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Make</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          {/* Technical Specs */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Engine</label>
            <input
              type="text"
              name="engine"
              value={formData.engine}
              onChange={handleChange}
              placeholder="e.g., 2.0L Turbo I4"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
                <option value="Dual-Clutch">Dual-Clutch</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Drivetrain</label>
              <select
                name="drivetrain"
                value={formData.drivetrain}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select drivetrain</option>
                <option value="FWD">Front-Wheel Drive</option>
                <option value="RWD">Rear-Wheel Drive</option>
                <option value="AWD">All-Wheel Drive</option>
                <option value="4WD">Four-Wheel Drive</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your vehicle, its history, and what makes it special..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              required
            />
          </div>

          {/* Modifications */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Modifications</label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newModification}
                onChange={(e) => setNewModification(e.target.value)}
                placeholder="Add a modification..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addModification())}
              />
              <button
                type="button"
                onClick={addModification}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.modifications.map((mod, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg border border-gray-700"
                >
                  <span className="text-sm text-white">{mod}</span>
                  <button
                    type="button"
                    onClick={() => removeModification(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Images</label>
            <div className="flex space-x-2 mb-3">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add image URL..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Vehicle ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium"
            >
              {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}