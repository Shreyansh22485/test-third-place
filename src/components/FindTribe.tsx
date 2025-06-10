"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/2.png", alt: "Up" },
  { src: "/3.png", alt: "Left" },
  { src: "/4.png", alt: "Right" },
  { src: "/1.png", alt: "Down" },
];

export default function FindTribe() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const translateDistance = 120; // Distance to spread out images

  // Define transforms for each image based on visibility
  const transforms = [
    visible
      ? `translate(-50%, calc(-50% - ${translateDistance}px)) scale(1)`
      : `translate(-50%, -50%) scale(1.3)`, // Up
    visible
      ? `translate(calc(-50% - ${translateDistance}px), -50%) scale(1)`
      : `translate(-50%, -50%) scale(1.3)`, // Left
    visible
      ? `translate(calc(-50% + ${translateDistance}px), -50%) scale(1)`
      : `translate(-50%, -50%) scale(1.3)`, // Right
    visible
      ? `translate(-50%, calc(-50% + ${translateDistance}px)) scale(1)`
      : `translate(-50%, -50%) scale(1.3)`, // Down
  ];

  return (
    <div
      ref={sectionRef}
      className="bg-black rounded-2xl pt-13 flex flex-col items-center justify-center w-full overflow-hidden"
    >
      <h2 className="text-[32px] text-white mb-1">
        FIND YOUR <span className="italic"> PEOPLE</span>
      </h2>
      <p className=" text-white w-full pl-7 justify-center text-[18px]"> Say "yes" and discover the people, places, and</p>
      <p className=" text-white w-full pl-9 justify-center text-[18px] mb-13"> moments you were never supposed to miss.</p>
      <div
        className="relative w-full max-w-4xl flex items-center justify-center"
        style={{
          height: visible ? "400px" : "500px",
          transition: "height 1s ease-in-out",
          overflow: "hidden", // Prevent images from overflowing the container
        }}
      >
        {images.map((img, idx) => (
          <div
            key={img.src}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: transforms[idx],
              transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
              zIndex: 10 - idx,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              pointerEvents: "none", // Prevent accidental interactions
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={220} // Slightly bigger for better coverage
              height={visible ? 220 : 300} // Taller when clubbed
              style={{
                width: "220px",
                height: visible ? "220px" : "300px",
                objectFit: "cover", // Ensure no gaps in the image
                borderRadius: "0.75rem",
                transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              unoptimized
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
