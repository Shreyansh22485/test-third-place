"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "./_components/MobileHeader";
import EventGallery from "./_components/EventGallery";
import TakeTest from "./_components/TakeTest";
import { useUser } from "@/hooks/useUser";
import { usePersonalityTestReturn } from "@/hooks/usePersonalityTestReturn";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/AuthProvider";

function DashboardContent() {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();

  console.log('Dashboard - authLoading:', authLoading, 'authUser:', authUser?.uid, 'user:', user?.id);

  const [showTakeTest, setShowTakeTest] = useState(() => {
    // Check session storage on initial load
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('takeTestDismissed');
      return dismissed !== 'true';
    }
    return true;
  });

  // Handle closing the take test component
  const handleCloseTakeTest = () => {
    setShowTakeTest(false);
    // Remember dismissal for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('takeTestDismissed', 'true');
    }
  };

  // Handle user data refresh when returning from personality test
  usePersonalityTestReturn();

  // Redirect to sign-in if not authenticated
  if (!authLoading && !authUser) {
    console.log('No auth user, redirecting to sign-in');
    router.push('/auth');
    return <DashboardSkeleton />;
  }

  // Check if personality test should be shown
  const shouldShowPersonalityTest = user && !user.personalityTestCompleted && showTakeTest;

  if (authLoading || loading) {
    return <DashboardSkeleton />;
  }return (
    <>
      <div className="max-w-6xl px-4 min-h-screen flex flex-col">
        {/* Header that shows only on mobile (keep it) */}
        <div className="md:hidden">
          <MobileHeader />
        </div>

        {/* Main content area */}
        <div className="sm:mt-10 flex-1">
          {/* ONE source of truth for cards on all break-points */}
          <EventGallery /> 
        </div>
      </div>
        {/* Fixed Personality Test Component - Only show if test not completed */}
      {shouldShowPersonalityTest && (
        <TakeTest onClose={handleCloseTakeTest} />
      )}
    </>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
