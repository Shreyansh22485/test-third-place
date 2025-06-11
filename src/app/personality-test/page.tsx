'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { personalityTestService } from '@/services/personalityTest.service';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PersonalityTestPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // If user has already completed the test, redirect to dashboard
      if (user.personalityTestCompleted) {
        router.push('/dashboard');
        return;
      }

      // Auto-redirect to Typeform
      const typeformUrl = personalityTestService.generateTypeformUrl({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email || '',
        phoneNumber: user.phoneNumber
      });

      // Redirect to Typeform
      window.location.href = typeformUrl;
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading personality test...</p>
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

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex h-[58px] items-center justify-between border-b border-[#E5E5EA] px-4">
        <Link href="/dashboard" className="p-1 text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold italic tracking-wide">PERSONALITY TEST</h1>
        <span className="h-5 w-5" />
      </header>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧠</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Redirecting to Personality Test
          </h2>
          
          <p className="text-gray-600 mb-6">
            We're taking you to our personality test. This helps us match you with the right people and experiences.
          </p>

          <div className="space-y-3">
            <div className="animate-pulse bg-gray-100 h-2 rounded-full"></div>
            <p className="text-sm text-gray-500">
              If you're not redirected automatically, 
              <Link 
                href="/dashboard" 
                className="text-black underline ml-1"
              >
                click here to go back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
