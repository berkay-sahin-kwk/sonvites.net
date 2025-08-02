import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Trash2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    newsletter: false
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Profile updated successfully!');
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'account', label: 'Account', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                    activeTab === tab.id
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Avatar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-4">Profile Picture</label>
                      <div className="flex items-center space-x-6">
                        <img
                          src={formData.avatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
                        />
                        <div>
                          <input
                            type="url"
                            value={formData.avatar}
                            onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                            placeholder="Avatar URL"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                          <p className="text-gray-400 text-sm mt-1">Enter a URL for your profile picture</p>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                        placeholder="Tell us about your passion for cars..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <h3 className="text-white font-medium">Likes</h3>
                        <p className="text-gray-400 text-sm">Get notified when someone likes your vehicle</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.likes}
                          onChange={() => handleNotificationChange('likes')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <h3 className="text-white font-medium">Comments</h3>
                        <p className="text-gray-400 text-sm">Get notified when someone comments on your vehicle</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.comments}
                          onChange={() => handleNotificationChange('comments')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <h3 className="text-white font-medium">New Followers</h3>
                        <p className="text-gray-400 text-sm">Get notified when someone follows you</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.follows}
                          onChange={() => handleNotificationChange('follows')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <h3 className="text-white font-medium">Newsletter</h3>
                        <p className="text-gray-400 text-sm">Receive updates about new features and community highlights</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.newsletter}
                          onChange={() => handleNotificationChange('newsletter')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="text-white font-medium mb-2">Profile Visibility</h3>
                      <p className="text-gray-400 text-sm mb-4">Control who can see your profile and vehicles</p>
                      
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="radio" name="visibility" className="text-yellow-400 focus:ring-yellow-400" defaultChecked />
                          <span className="ml-3 text-white">Public - Anyone can see your profile</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="visibility" className="text-yellow-400 focus:ring-yellow-400" />
                          <span className="ml-3 text-white">Followers only - Only your followers can see your profile</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="visibility" className="text-yellow-400 focus:ring-yellow-400" />
                          <span className="ml-3 text-white">Private - No one can see your profile</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="text-white font-medium mb-2">Contact Settings</h3>
                      <p className="text-gray-400 text-sm mb-4">Control how others can contact you</p>
                      
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="text-yellow-400 focus:ring-yellow-400" defaultChecked />
                          <span className="ml-3 text-white">Allow direct messages</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="text-yellow-400 focus:ring-yellow-400" defaultChecked />
                          <span className="ml-3 text-white">Show online status</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Account Management</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="text-white font-medium mb-2">Change Password</h3>
                      <p className="text-gray-400 text-sm mb-4">Update your account password</p>
                      
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current password"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                          type="password"
                          placeholder="New password"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                      <h3 className="text-red-300 font-medium mb-2 flex items-center">
                        <Trash2 className="h-5 w-5 mr-2" />
                        Delete Account
                      </h3>
                      <p className="text-red-400 text-sm mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}