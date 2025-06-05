"use client";

import { useAuth } from '@/components/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/sign-in' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    console.log('🛡️ ProtectedRoute: Checking auth state', {
      loading,
      isAuthenticated: !!user,
      pathname,
      uid: user?.uid
    });
    
    // Wait for auth state to load
    if (loading) {
      console.log('🛡️ ProtectedRoute: Still loading auth state...');
      return;
    }
    
    // If no user is authenticated, redirect to sign-in
    if (!user) {
      console.log('🛡️ ProtectedRoute: No user found, redirecting to sign-in');
      router.push(redirectTo);
      return;
    }
    
    // If user is authenticated but on auth pages, redirect to dashboard
    if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
      console.log('🛡️ ProtectedRoute: User authenticated but on auth page, redirecting to dashboard');
      router.push('/dashboard');
      return;
    }
    
    console.log('🛡️ ProtectedRoute: User authenticated and on valid page');
  }, [user, loading, router, redirectTo, pathname]);

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  // (useEffect will handle the redirect)
  if (!user) {
    return null;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
