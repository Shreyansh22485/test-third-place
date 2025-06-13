'use client';

import React from 'react';
import { DM_Sans } from 'next/font/google';
import { Volume2, VolumeX } from 'lucide-react';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

type Props = {
  videoId: string;
  activeVideo: string | null;
  setActiveVideo: (id: string | null) => void;
};

function NewsSection({ videoId, activeVideo, setActiveVideo }: Props) {
  const isMuted = activeVideo !== videoId;

  return (
    <div className={`bg-black w-full py-10 px-2 sm:px-4 md:px-6 lg:px-8 ${dmSans.className}`}>
      <div className="flex flex-col-reverse font-sans lg:flex-row items-center max-w-6xl mx-auto gap-8">

        {/* -------- Left text block unchanged -------- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="relative flex gap-3 md:gap-6 items-start">
            <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-full" />
            <div className="pl-3 sm:pl-5 md:pl-8 w-full">
              <div className="bg-white text-black font-bold h-[20px] font-sans text-[14px] px-3  rounded text-xs sm:text-sm md:text-base w-fit mb-3 md:mb-4 shadow-md">
                BREAKING NEWS
              </div>
              <h3 className="font-bold uppercase font-sans tracking-tight leading-snug text-left w-full text-white">
                <span
                  className="block whitespace-nowrap text-[clamp(0.9rem,5.4vw,2.25rem)]"
                  style={{ fontSize: 'clamp(0.9rem, 5.4vw, 2.25rem)' }}
                >
                  OUR GENERATION IS SO DEPRESSED
                </span>
                <span
                  className="block whitespace-nowrap text-[clamp(0.9rem,5.4vw,2.25rem)]"
                  style={{ fontSize: 'clamp(0.9rem, 5.4vw, 2.25rem)' }}
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

      {/* -------- Right video block -------- */}
<div className="w-full lg:w-1/2 flex justify-center">
  <div className="relative border-4 border-white rounded-xl overflow-hidden shadow-xl w-full max-w-xl">
    <video
     
      src="https://firebasestorage.googleapis.com/v0/b/thirdplace-3f85e.firebasestorage.app/o/Video2(website).mp4?alt=media&token=6a2d9ae3-5dc8-4690-af05-57481e85c610"
      poster="/poster_video2.png"
      autoPlay
      loop
      playsInline
      muted={isMuted}
      style={{ objectFit: "cover", objectPosition: "center" }} // Ensures no zoom, stays origin
    />
    <button
      onClick={() => setActiveVideo(isMuted ? videoId : null)}
      className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-full backdrop-blur-lg"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  </div>
</div>
      </div>
    </div>
  );
}

export default NewsSection;
