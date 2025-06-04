import Image from "next/image";
import React from "react";

function MobileHeader() {
  return (
    <header className="w-full flex items-center justify-between pr-4 py-2 -mb-2">
      {/* Logo on the far left with adjusted left margin */}
      <Image
        src="/Logo_001-01.png"
        alt="Third Place Logo"
        width={80}
        height={30}
        className="object-contain"
        priority
      />

      {/* City + arrow on the far right */}
      <div className="flex items-center gap-2">
        <span className="text-base tracking-tight uppercase">Bengaluru</span>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </header>
  );
}

export default MobileHeader;
