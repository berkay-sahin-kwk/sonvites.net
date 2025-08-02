import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  avatar: string;
  joinDate: string;
  followers: string[];
  following: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'joinDate' | 'followers' | 'following'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    fullName: 'John Doe',
    bio: 'Car enthusiast with a passion for classic muscle cars and modern supercars.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2024-01-15',
    followers: ['2', '3'],
    following: ['2']
  },
  {
    id: '2',
    username: 'sarahwilson',
    email: 'sarah@example.com',
    password: 'password123',
    fullName: 'Sarah Wilson',
    bio: 'JDM fanatic and weekend track day warrior. Always looking for the next project car.',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2024-02-01',
    followers: ['1'],
    following: ['1', '3']
  },
  {
    id: '3',
    username: 'mikejohnson',
    email: 'mike@example.com',
    password: 'password123',
    fullName: 'Mike Johnson',
    bio: 'Euro car specialist. Love working on BMW and Audi performance builds.',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2024-01-28',
    followers: ['2'],
    following: []
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('garagebook_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('garagebook_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'joinDate' | 'followers' | 'following'> & { password: string }): Promise<boolean> => {
    const existingUser = mockUsers.find(u => u.email === userData.email || u.username === userData.username);
    if (existingUser) {
      return false;
    }

    const newUser: User & { password: string } = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      followers: [],
      following: []
    };

    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('garagebook_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('garagebook_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('garagebook_user', JSON.stringify(updatedUser));
      
      // Update in mockUsers array
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}