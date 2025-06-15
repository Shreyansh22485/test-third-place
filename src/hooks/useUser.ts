import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/components/AuthProvider';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  address: {
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  profileImage?: string;
  eventsBooked: string[];
  pastEventsAttended: string[];
  personalityTestCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseUserReturn {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
}

export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, loading: authLoading } = useAuth();
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/users/profile');
      
      if (response.data.success) {
        // Transform backend response to match frontend interface
        const userData = response.data.data;
        setUser({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth,
          address: {
            city: userData.address?.city || '',
            state: userData.address?.state || '',
            country: userData.address?.country || '',
            pincode: userData.address?.pincode || ''
          },
          profileImage: userData.profileImage,
          eventsBooked: userData.eventsBooked || [],
          pastEventsAttended: userData.pastEventsAttended || [],
          personalityTestCompleted: userData.personalityTestCompleted || false,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt
        });
      } else {
        setError('Failed to fetch user profile');
      }
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      
      if (err.response?.status === 401) {
        // Token is invalid, user should be logged out
        logout();
        setError('Authentication expired. Please sign in again.');
      } else if (err.response?.status === 404) {
        setError('User profile not found');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch user profile');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = async (updates: Partial<UserProfile>) => {
    try {
      setError(null);
      
      const response = await api.put('/users/profile', updates);
      
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err: any) {
      console.error('Error updating user profile:', err);
      const errorMessage = err.response?.data?.error || 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };  const logout = useCallback(async () => {
    try {
      // Sign out from Firebase Auth
      await authService.signOut();
      
      // Clear user state
      setUser(null);
      setError(null);
      
      // Redirect to Landing page
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error during logout:', error);
        // Even if Firebase signOut fails, clear local state and redirect
      localStorage.removeItem('authToken');
      setUser(null);
      setError(null);
      window.location.href = '/';
    }
  }, []);  useEffect(() => {
    console.log('useUser effect - authLoading:', authLoading, 'authUser:', authUser?.uid);
    
    // Don't fetch if auth is still loading
    if (authLoading) {
      return;
    }
    
    // Only fetch user if Firebase user is authenticated and we have a token
    if (authUser) {
      const token = localStorage.getItem('authToken');
      console.log('Token from localStorage:', token ? 'exists' : 'missing');
      
      if (token) {
        fetchUser();
      } else {
        // Wait a bit for token to be stored, then try again
        const timeoutId = setTimeout(() => {
          const token = localStorage.getItem('authToken');
          if (token) {
            console.log('Token found after timeout, fetching user');
            fetchUser();
          } else {
            console.log('No token found after timeout');
            setLoading(false);
            setError('Authentication token not found');
          }
        }, 1000);
        
        return () => clearTimeout(timeoutId);
      }
    } else {
      // No Firebase user, don't fetch
      console.log('No Firebase user authenticated');
      setLoading(false);
      setUser(null);
    }
  }, [fetchUser, authUser, authLoading]);

  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser,
    logout
  };
};
