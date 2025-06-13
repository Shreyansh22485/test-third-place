'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { personalityTestService } from '@/services/personalityTest.service';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Widget as TypeformWidget } from '@typeform/embed-react';

export default function PersonalityTestPage() {
  const { user, loading, fetchUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showEmbed, setShowEmbed] = useState(false);
  useEffect(() => {
    if (!loading && user) {
      // Check if this is a retake (if user has completed test but wants to retake)
      const retake = searchParams.get('retake');
      
      // If user has already completed the test and it's not a retake, redirect back
      if (user.personalityTestCompleted && retake !== 'true') {
        const returnTo = searchParams.get('returnTo');
        if (returnTo) {
          router.push(decodeURIComponent(returnTo));
        } else {
          router.push('/dashboard');
        }
        return;
      }

      // Show the embedded form (for first time or retake)
      setShowEmbed(true);
    }
  }, [user, loading, router, searchParams]);const handleTypeformSubmit = async (payload: { formId: string; responseId: string }) => {
    console.log('Typeform submitted!', payload);
    console.log('Response ID:', payload.responseId);
    
    // Wait a moment for the webhook to process, then refresh user data
    setTimeout(async () => {
      try {
        console.log('Refreshing user data after test completion...');
        
        // Refresh user data to update the cache
        await fetchUser();
        
        console.log('User data refreshed, redirecting...');
          // Add a small delay to ensure the user data is updated in the UI
        setTimeout(() => {
          const returnTo = searchParams.get('returnTo');
          if (returnTo) {
            const url = decodeURIComponent(returnTo);
            const separator = url.includes('?') ? '&' : '?';
            router.push(`${url}${separator}fromPersonalityTest=true`);
          } else {
            router.push('/dashboard?fromPersonalityTest=true');
          }
        }, 500);
      } catch (error) {
        console.error('Error refreshing user data:', error);        // Redirect anyway if there's an error
        const returnTo = searchParams.get('returnTo');
        if (returnTo) {
          const url = decodeURIComponent(returnTo);
          const separator = url.includes('?') ? '&' : '?';
          router.push(`${url}${separator}fromPersonalityTest=true`);
        } else {
          router.push('/dashboard?fromPersonalityTest=true');
        }
      }
    }, 2000); // Wait 2 seconds for webhook to process
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to take the personality test.
          </p>
          <Link
            href="/sign-in"
            className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const returnTo = searchParams.get('returnTo');
  const backUrl = returnTo ? decodeURIComponent(returnTo) : '/dashboard';

  if (!showEmbed) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading personality test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex h-[58px] items-center justify-between border-b border-[#E5E5EA] px-4 bg-white">
        <Link href={backUrl} className="p-1 text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold italic tracking-wide">PERSONALITY TEST</h1>
        <span className="h-5 w-5" />
      </header>      {/* Typeform Embed */}
      <div className="h-[calc(100vh-58px)]">
        <TypeformWidget
          id="XiBDE8Js"
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full"
          onSubmit={handleTypeformSubmit}
          transitiveSearchParams={true}
          hidden={{
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email || '',
            phone_number: user.phoneNumber,
            user_id: user.id
          }}
        />
      </div>
    </div>
  );
}
