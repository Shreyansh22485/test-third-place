import Image from "next/image";
import React from "react";

function MobileHeader() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2">
      {/* Logo on the far left */}
      <Image
        src="/Logo_001-01.png"
        alt="Third Place Logo"
        width={80}
        height={30}
        className="object-contain"
        priority
      />

      {/* City + arrow on the far right */}
      <div className="flex items-center gap-1">
        <span className="text-0.5xl font-normal tracking-tight">Bengaluru</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </header>
  );
}

export default MobileHeader;
