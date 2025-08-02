import React from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Check, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Notifications() {
  const { notifications, markNotificationAsRead } = useData();

  const mockNotifications = [
    {
      id: '1',
      type: 'like' as const,
      fromUsername: 'sarahwilson',
      message: 'liked your 1998 Toyota Supra',
      vehicleName: '1998 Toyota Supra',
      createdAt: '2024-03-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'comment' as const,
      fromUsername: 'mikejohnson',
      message: 'commented on your 1998 Toyota Supra',
      vehicleName: '1998 Toyota Supra',
      createdAt: '2024-03-14T16:20:00Z',
      read: false
    },
    {
      id: '3',
      type: 'follow' as const,
      fromUsername: 'carfanatic92',
      message: 'started following you',
      createdAt: '2024-03-13T12:15:00Z',
      read: true
    },
    {
      id: '4',
      type: 'like' as const,
      fromUsername: 'speedster',
      message: 'liked your Honda Civic Type R',
      vehicleName: 'Honda Civic Type R',
      createdAt: '2024-03-12T09:45:00Z',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-400" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-400" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const allNotifications = [...mockNotifications, ...notifications];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-gray-400">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'You\'re all caught up!'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {allNotifications.length > 0 ? (
            allNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 rounded-xl border transition-colors ${
                  notification.read
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-gray-800 border-gray-700 ring-1 ring-yellow-400/20'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white">
                          <span className="font-medium">{notification.fromUsername}</span>{' '}
                          <span className="text-gray-300">{notification.message}</span>
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          title="Dismiss"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notifications yet</h3>
              <p className="text-gray-500">
                When you start engaging with the community, your notifications will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Notification Settings Link */}
        <div className="mt-12">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">Notification Preferences</h3>
                <p className="text-gray-400 text-sm">
                  Control what notifications you receive
                </p>
              </div>
              <a
                href="/settings"
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium"
              >
                Manage Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}