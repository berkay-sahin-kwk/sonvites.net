import React, { createContext, useContext, useState } from 'react';

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  modifications: string[];
  description: string;
  images: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow';
  fromUserId: string;
  fromUsername: string;
  vehicleId?: string;
  vehicleName?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface DataContextType {
  vehicles: Vehicle[];
  notifications: Notification[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'likes' | 'comments' | 'createdAt'>) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  likeVehicle: (vehicleId: string, userId: string) => void;
  addComment: (vehicleId: string, userId: string, username: string, avatar: string, text: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  getVehiclesByUser: (userId: string) => Vehicle[];
  getUserById: (id: string) => any;
  followUser: (userId: string, targetUserId: string) => void;
  unfollowUser: (userId: string, targetUserId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    userId: '1',
    make: 'Toyota',
    model: 'Supra',
    year: 1998,
    color: 'Deep Purple Pearl',
    engine: '2JZ-GTE Twin Turbo',
    transmission: '6-Speed Manual',
    drivetrain: 'RWD',
    modifications: ['Single Turbo Conversion', 'Coilovers', 'Aftermarket Wheels', 'Cold Air Intake', 'Exhaust System'],
    description: 'My pride and joy! This Supra has been in my family for over 10 years. Recently completed a single turbo conversion and the car is making incredible power.',
    images: [
      'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: ['2', '3'],
    comments: [
      {
        id: '1',
        userId: '2',
        username: 'sarahwilson',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Absolutely beautiful build! The single turbo setup must be amazing.',
        createdAt: '2024-03-15T10:30:00Z'
      }
    ],
    createdAt: '2024-03-10T09:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    make: 'Honda',
    model: 'Civic Type R',
    year: 2023,
    color: 'Championship White',
    engine: 'K20C1 Turbo',
    transmission: '6-Speed Manual',
    drivetrain: 'FWD',
    modifications: ['Intake System', 'Downpipe', 'Tune', 'Lowering Springs'],
    description: 'Latest generation Type R with some tasteful modifications. Perfect balance of street and track performance.',
    images: [
      'https://images.pexels.com/photos/2127040/pexels-photo-2127040.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: ['1'],
    comments: [],
    createdAt: '2024-03-12T14:20:00Z'
  },
  {
    id: '3',
    userId: '3',
    make: 'BMW',
    model: 'M3',
    year: 2020,
    color: 'Mineral Gray Metallic',
    engine: 'S58 Twin Turbo',
    transmission: '8-Speed Automatic',
    drivetrain: 'RWD',
    modifications: ['Cold Air Intake', 'Exhaust System', 'Lowering Springs', 'Performance Tune'],
    description: 'Daily driver that doubles as a weekend warrior. The S58 engine is an absolute beast!',
    images: [
      'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: ['1', '2'],
    comments: [],
    createdAt: '2024-03-08T16:45:00Z'
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString(),
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    setVehicles(prev => [newVehicle, ...prev]);
  };

  const updateVehicle = (id: string, vehicleData: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...vehicleData } : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const likeVehicle = (vehicleId: string, userId: string) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const hasLiked = v.likes.includes(userId);
        return {
          ...v,
          likes: hasLiked 
            ? v.likes.filter(id => id !== userId)
            : [...v.likes, userId]
        };
      }
      return v;
    }));
  };

  const addComment = (vehicleId: string, userId: string, username: string, avatar: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId,
      username,
      avatar,
      text,
      createdAt: new Date().toISOString()
    };

    setVehicles(prev => prev.map(v => 
      v.id === vehicleId 
        ? { ...v, comments: [...v.comments, newComment] }
        : v
    ));
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getVehiclesByUser = (userId: string) => {
    return vehicles.filter(v => v.userId === userId);
  };

  const getUserById = (id: string) => {
    // This would typically come from a users context or API
    return null;
  };

  const followUser = (userId: string, targetUserId: string) => {
    // This would update the user's following list
  };

  const unfollowUser = (userId: string, targetUserId: string) => {
    // This would update the user's following list
  };

  return (
    <DataContext.Provider value={{
      vehicles,
      notifications,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      likeVehicle,
      addComment,
      addNotification,
      markNotificationAsRead,
      getVehiclesByUser,
      getUserById,
      followUser,
      unfollowUser
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}