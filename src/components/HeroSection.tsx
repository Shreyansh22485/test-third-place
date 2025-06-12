import React from 'react';
import JoinNowDiv from './FirstButton';

function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-start bg-black">
      {/* Full-width video at the top */}
      <video
        className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/thirdplace-3f85e.firebasestorage.app/o/Video1(website).mp4?alt=media&token=1c8758fb-eb82-4798-a411-e32f0e3c0c77"
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
          <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl  text-white tracking-tight ">
            REAL CONNECTIONS,
          </h1>
          <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight -mt-2 mb-4">
            REAL LIFE
          </h1>
          <p className="text-[18px] sm:text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
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
