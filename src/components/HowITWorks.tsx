"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'SHOW UP & LET THE MAGIC HAPPEN',
    description:
      'Complete a quick personality test and let us curate experiences tailored just for you.',
    gif: '/step1.gif',
  },
  {
    id: 2,
    title: 'DISCOVER YOUR TRIBE',
    description:
      'Find your people through curated experiences that match your vibe.',
    gif: '/step2-ezgif.com-reverse.gif',
  },
  {
    id: 3,
    title: 'MAKE LASTING CONNECTIONS',
    description:
      'Engage in meaningful events and build lifelong friendships.',
    gif: '/step3-ezgif.com-crop.gif',
  },
];

const StepCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="w-full bg-white flex flex-col items-center pt-8 pb-8">
      {/* Heading */}
      <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold text-center font-serif">
        HOW IT <span className="italic">WORKS ?</span>
      </h1>
      <h2 className="text-black text-center font-serif mb-6">
        Real connection in 3 easy steps
      </h2>

      {/* Progress Bar */}
      <div className="w-full flex justify-center mb-8 px-4">
        <div className="relative w-24 md:w-32 h-1 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-1 bg-black rounded-full transition-all duration-300"
            style={{
              width: `${((current + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex flex-col lg:flex-row lg:gap-12 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto">
        <div className="bg-[#FAF0E5] rounded-2xl shadow-lg px-4 py-6 flex flex-col items-center flex-1 min-h-[430px]">
          {/* Step Circle (now always visible at the top) */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold text-lg mb-3">
            {slides[current].id}
          </div>
          <div className="w-full flex flex-col items-center flex-1">
            <h3 className="text-black text-center text-lg lg:text-xl font-serif italic font-semibold mb-3">
              {slides[current].title}
            </h3>
            <p className="text-center text-black mb-4 text-sm lg:text-base font-serif leading-relaxed">
              {slides[current].description}
            </p>
            {/* GIF at the bottom, sticking to the card's end */}
            <div className="flex-1 flex items-end w-full">
              <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                <Image
                  src={slides[current].gif}
                  alt={`Slide ${slides[current].id} GIF`}
                  width={320}
                  height={320}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (OUTSIDE the card) */}
      <div className="flex items-center gap-8 mt-6">
        {current > 0 ? (
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : (
          <div className="w-8 h-8" />
        )}

        {current < slides.length - 1 ? (
          <button
            onClick={next}
            aria-label="Next slide"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>

      {/* Call-to-Action Button */}
      <button className="mt-8 w-[70%] md:w-[50%] lg:w-auto bg-black text-white italic rounded-full py-3 px-8 text-base lg:text-lg font-serif shadow-md hover:bg-gray-800 transition-colors">
        START YOUR JOURNEY
      </button>
    </div>
  );
};

export default StepCarousel;
