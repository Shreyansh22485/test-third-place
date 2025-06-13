'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface AuthLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AuthLink({ children, className, onClick }: AuthLinkProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }
    
    if (!loading) {
      if (user) {
        // User is already logged in, go directly to dashboard
        router.push('/dashboard');
      } else {
        // User is not logged in, go to auth page
        router.push('/auth');
      }
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
