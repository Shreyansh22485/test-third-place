import React from 'react';

function NewsSection() {
  return (
    <div className="bg-black w-full py-12 px-4 md:px-6 lg:px-8">
      {/* Flex: col-reverse on mobile/tablet, row on desktop */}
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center max-w-6xl mx-auto gap-8">
        {/* Left (on desktop): News Card */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="relative flex gap-4 md:gap-6 items-start">
            {/* Vertical pink line */}
            <div className="absolute left-0 top-0 h-full w-1.5 md:w-2 bg-pink-400 rounded-full" />
            <div className="pl-6 md:pl-8">
              <div className="bg-white text-black font-bold px-3 py-1.5 rounded text-sm md:text-base w-fit mb-3 md:mb-4 shadow-md">
                NEWS
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase font-sans tracking-tight leading-snug text-left">
                OUR GENERATION IS SO DEPRESSED<br />
                BECAUSE WE LACK THIRD PLACES
              </h3>
              <p className="hidden md:block text-gray-300 mt-4 text-base lg:text-lg leading-relaxed text-left">
                The decline of informal gathering spots has a profound impact on our well-being. Rediscover the power of community and shared experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Right (on desktop): Video with white border and rounded corners */}
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
