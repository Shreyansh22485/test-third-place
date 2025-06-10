import Image from "next/image";
import React from "react";

function MobileHeader() {
  return (
    <header
      className="w-full flex items-center justify-between -ml-1  "
      style={{
        height: "56px", // Custom height
        minHeight: "56px",
        maxHeight: "56px",
      }}
    >
      {/* Logo on the far left with adjusted left margin */}
      <Image
        src="/Logo_001-01.png"
        alt="Third Place Logo"
        width={72}   // Adjusted for compactness
        height={34}
        className="object-contain "
        priority
      />

{/* City + arrow on the far right */}
<div className="flex items-center gap-[1px] translate-x-[6px]">
  <span className="text-[17px] tracking-tight uppercase">Bengaluru</span>
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
  >
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
