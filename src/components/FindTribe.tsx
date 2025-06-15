"use client";

import React from "react";
import Image from "next/image";

/* ───────────────────────── CONFIG ───────────────────────── */

// Image order must match transforms below
const IMAGES = [
  { src: "/2.png", alt: "Top card"    }, // 0
  { src: "/3.png", alt: "Left card"   }, // 1
  { src: "/4.png", alt: "Right card"  }, // 2
  { src: "/1.png", alt: "Bottom card" }, // 3
];

// Sizes in pixels
const SIZE_OUTER = 220; // for /2.png & /1.png
const SIZE_INNER = 200; // for /3.png & /4.png

// Offsets from center in pixels
const GAP_X = 110;  // horizontal
const GAP_Y = 140;  // vertical for both top & bottom

export default function FindTribe() {
  /* transforms for top, left, right, bottom positions */
  const transforms = [
    `translate(-50%, calc(-50% - ${GAP_Y}px))`, // top
    `translate(calc(-50% - ${GAP_X}px), -50%)`, // left
    `translate(calc(-50% + ${GAP_X}px), -50%)`, // right
    `translate(-50%, calc(-50% + ${GAP_Y}px))`, // bottom
  ];

  /* z-index map: keep inner cards underneath, outer cards on top */
  const zIndices = [10, 5, 5, 10];

  return (
    <div className="bg-black rounded-2xl pt-13 flex flex-col items-center w-full overflow-hidden">
      {/* Heading */}
      <h2 className="text-[32px] text-white mb-1">
        FIND YOUR <span className="italic"> PEOPLE</span>
      </h2>
      <p className="text-white w-full pl-7 text-[18px]">
        Say "yes" and discover the people, places, and
      </p>
      <p className="text-white w-full pl-9 text-[18px] mb-13">
        moments you were never supposed to miss.
      </p>

      {/* Collage container */}
      <div
        className="relative w-full max-w-4xl flex items-center justify-center"
        style={{ height: 500 }}
      >
        {IMAGES.map((img, idx) => {
          const size = idx === 1 || idx === 2 ? SIZE_INNER : SIZE_OUTER;
          return (
            <div
              key={img.src}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: transforms[idx],
                zIndex: zIndices[idx],
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                pointerEvents: "none",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={size}
                height={size}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  objectFit: "cover",
                  borderRadius: "0.75rem",
                }}
                unoptimized
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
