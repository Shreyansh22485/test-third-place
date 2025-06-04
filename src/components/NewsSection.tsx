import React from 'react';

function NewsSection() {
  return (
    <div className="bg-black w-full py-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row items-center max-w-6xl mx-auto gap-8">
        {/* Left: News Card */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="relative flex gap-3 md:gap-6 items-start">
            {/* Vertical white line */}
            <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-full" />
            <div className="pl-3 sm:pl-5 md:pl-8 w-full">
              <div className="bg-white text-black font-bold px-3 py-1.5 rounded text-xs sm:text-sm md:text-base w-fit mb-3 md:mb-4 shadow-md">
                NEWS
              </div>
              <h3 className="font-bold uppercase font-sans tracking-tight leading-snug text-left w-full text-white">
                <span
                  className="
                    block
                    whitespace-nowrap
                    text-[clamp(0.9rem,5.4vw,2.25rem)]
                  "
                  style={{
                    fontSize: 'clamp(0.9rem, 5.4vw, 2.25rem)',
                  }}
                >
                  OUR GENERATION IS SO DEPRESSED
                </span>
                <span
                  className="
                    block
                    whitespace-nowrap
                    text-[clamp(0.9rem,5.4vw,2.25rem)]
                  "
                  style={{
                    fontSize: 'clamp(0.9rem, 5.4vw, 2.25rem)',
                  }}
                >
                  BECAUSE WE LACK THIRD PLACES
                </span>
              </h3>
              <p className="hidden md:block text-gray-300 mt-4 text-base lg:text-lg leading-relaxed text-left">
                The decline of informal gathering spots has a profound impact on our well-being. Rediscover the power of community and shared experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Video */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="border-4 border-white rounded-xl overflow-hidden shadow-xl w-full max-w-xl">
            <video
              className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover"
              src="/Video2(website).mp4"
              poster="/images/mainarea-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
