"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string | null>;
  refreshUserState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  getToken: async () => null,
  refreshUserState: async () => {}
});

// Higher order component to provide authentication context
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Function to get fresh Firebase ID token
  const getToken = async (): Promise<string | null> => {
    try {
      if (!user) return null;
      
      // Get fresh token (Firebase will handle refresh automatically)
      const token = await user.getIdToken(true);
      localStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      localStorage.removeItem('authToken');
      return null;
    }
  };

  // Function to refresh user state after registration
  const refreshUserState = async (): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      console.log('🔐 AuthProvider: Manually refreshing user state after registration');
      const token = await currentUser.getIdToken();
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log('🔐 AuthProvider: User profile found after registration - setting user');
        setUser(currentUser);
      } else {
        console.log('🔐 AuthProvider: User profile still not found after registration');
      }
    } catch (error) {
      console.error('🔐 AuthProvider: Error refreshing user state:', error);
    }
  };
  useEffect(() => {
    console.log('🔐 AuthProvider: Setting up auth state listener');
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 AuthProvider: Auth state changed', {
        isAuthenticated: !!user,
        uid: user?.uid,
        phoneNumber: user?.phoneNumber,
        email: user?.email
      });
      
      if (user) {
        try {
          console.log('🔐 AuthProvider: Getting fresh token for authenticated user');
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
          console.log('🔐 AuthProvider: Token stored successfully');
          
          // Check if user profile exists in database
          try {
            console.log('🔐 AuthProvider: Checking if user profile exists in database');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              console.log('🔐 AuthProvider: User profile exists in database - setting authenticated user');
              setUser(user);
            } else if (response.status === 404) {
              console.log('🔐 AuthProvider: User profile not found - user needs to complete registration');
              // User is authenticated with Firebase but profile doesn't exist
              // Don't set user, so they stay on auth page to complete registration
              setUser(null);
            } else {
              console.error('🔐 AuthProvider: Error checking user profile:', response.status);
              setUser(null);
            }
          } catch (error) {
            console.error('🔐 AuthProvider: Error checking user profile:', error);
            setUser(null);
          }
        } catch (error) {
          console.error('🔐 AuthProvider: Error storing auth token:', error);
          setUser(null);
        }
      } else {
        // Clear token when user signs out
        console.log('🔐 AuthProvider: Clearing auth token (user signed out)');
        localStorage.removeItem('authToken');
        setUser(null);
      }
      
      setLoading(false);
      console.log('🔐 AuthProvider: Auth loading complete');
    });

    // cleanup
    return () => {
      console.log('🔐 AuthProvider: Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getToken, refreshUserState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
