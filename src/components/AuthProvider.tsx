"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  getToken: async () => null
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
  useEffect(() => {
    console.log('🔐 AuthProvider: Setting up auth state listener');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 AuthProvider: Auth state changed', {
        isAuthenticated: !!user,
        uid: user?.uid,
        phoneNumber: user?.phoneNumber,
        email: user?.email
      });
      
      // Updates the user state when the user logs in or out
      setUser(user || null);
      
      if (user) {
        // Store fresh token when user signs in
        try {
          console.log('🔐 AuthProvider: Getting fresh token for authenticated user');
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
          console.log('🔐 AuthProvider: Token stored successfully');
        } catch (error) {
          console.error('🔐 AuthProvider: Error storing auth token:', error);
        }
      } else {
        // Clear token when user signs out
        console.log('🔐 AuthProvider: Clearing auth token (user signed out)');
        localStorage.removeItem('authToken');
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
    <AuthContext.Provider value={{ user, loading, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
