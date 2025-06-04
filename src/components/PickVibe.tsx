import React from 'react';
import Image from 'next/image';

function PickVibe() {
  return (
    <div className=" w-full bg-white text-black flex flex-col items-center justify-center text-center p-4 pb-35 pt-5">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-3">
        PICK YOUR <span className="italic">VIBE</span>
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-normal mb-1">
        From cozy dinners to dance-all-night
      </h2>
      <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-normal">
        parties- it's all here.
      </h2>

      <div className="bg-white items-center flex flex-col justify-center  mt-10">
        <Image
          src="/protoType1.svg"
          alt="Animated character"
          width={355}
          height={629}
          className="object-contain"
          unoptimized
        />
      </div>
           <div className="flex mt-10 justify-center items-center  bg-white">
    <div className="border w-[210px]  bg-black rounded-2xl px-10 py-2 flex items-center justify-center">
      <span className="text-white  text-[20px]  tracking-wide">
       SIGN UP NOW!
      </span>
    </div>
  </div>
    
    </div>
  );
}

export default PickVibe;
