"use client";

import MobileHeader from "./_components/MobileHeader";
import EventGallery from "./_components/EventGallery";

export default function Dashboard() {
  return (
    <div className="max-w-6xl px-4 min-h-screen flex flex-col">
      {/* Header that shows only on mobile (keep it) */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* ONE source of truth for cards on all break-points */}
      <div className="sm:mt-10 flex-1">
        <EventGallery /> 
      </div>
    </div>
  );
}
