import React from 'react';
import JoinNowDiv from './FirstButton';

function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-start bg-black">
      {/* Full-width video at the top */}
      <video
        className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] object-cover"
        src="/Video1(website).mp4"
        poster="/images/mainarea-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Responsive content below the video */}
      <div className="w-full px-4 mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-6xl mx-auto">
        {/* Text content */}
        <div className="w-full lg:w-2/3 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-2">
            REAL CONNECTION
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
            REAL LIFE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
            Find your people through curated experiences.
          </p>
        </div>
        {/* Button */}
        <div className="mt-6 lg:mt-0 lg:ml-8 flex justify-center lg:justify-end w-full lg:w-1/3">
          <JoinNowDiv />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
