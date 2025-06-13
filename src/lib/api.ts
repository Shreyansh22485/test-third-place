import axios from 'axios';
import { auth } from '@/lib/firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    try {
      console.log('🔗 API Interceptor: Preparing request to', config.url);
      
      // Only try to get auth token on the client side
      if (typeof window !== 'undefined') {
        // Get current user from Firebase
        const user = auth.currentUser;
        
        console.log('🔗 API Interceptor: Firebase user state', {
          hasUser: !!user,
          uid: user?.uid,
          phoneNumber: user?.phoneNumber
        });
        
        if (user) {
          // Get fresh token (Firebase handles refresh automatically)
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
          // Store fresh token in localStorage
          localStorage.setItem('authToken', token);
          console.log('🔗 API Interceptor: Fresh token obtained and set');
        } else {
          // If no user, try to get token from localStorage as fallback
          const token = localStorage.getItem('authToken');
          console.log('🔗 API Interceptor: No Firebase user, localStorage token:', !!token);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔗 API Interceptor: Using localStorage token');
          } else {
            console.log('🔗 API Interceptor: No token available');
          }
        }
      }
    } catch (error: any) {
      console.error('🔗 API Interceptor: Error getting auth token:', error);
      // Clear invalid token (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    }
    
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token and redirect to sign-in (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
