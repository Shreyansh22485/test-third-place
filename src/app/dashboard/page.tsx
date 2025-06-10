"use client";

import { useState } from "react";
import MobileHeader from "./_components/MobileHeader";
import EventGallery from "./_components/EventGallery";
import TakeTest from "./_components/TakeTest";
import { useUser } from "@/hooks/useUser";

export default function Dashboard() {
  const { user } = useUser();
  const [showTakeTest, setShowTakeTest] = useState(true);

  // Check if personality test should be shown
  const shouldShowPersonalityTest = user && !user.personalityTestCompleted && showTakeTest;  return (
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
        <TakeTest onClose={() => setShowTakeTest(false)} />
      )}
    </>
  );
}
