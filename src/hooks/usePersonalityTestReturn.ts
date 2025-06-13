import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from './useUser';

/**
 * Hook to handle user data refresh when returning from personality test
 * This ensures the UI is updated with the latest test completion status
 */
export const usePersonalityTestReturn = () => {
  const { fetchUser } = useUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we're returning from the personality test
    const fromPersonalityTest = searchParams.get('fromPersonalityTest');
    
    if (fromPersonalityTest === 'true') {
      console.log('Returning from personality test, refreshing user data...');
      
      // Refresh user data to ensure the UI shows the updated test status
      fetchUser().catch(error => {
        console.error('Error refreshing user data after personality test:', error);
      });

      // Clean up the URL parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('fromPersonalityTest');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, fetchUser]);
};
