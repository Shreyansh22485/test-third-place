import React from 'react';

function WhyNeed() {
  return (
    <div className="bg-black flex flex-col justify-center items-center px-4">
      {/* Mobile/Tablet: Two lines */}
      <div className="block lg:hidden">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
          WHY WE NEED
        </h2>
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
          A THIRD PLACE?
        </h2>
      </div>
      {/* Desktop: One line */}
      <div className="hidden lg:block">
        <h2 className="text-white text-5xl xl:text-6xl font-semibold text-center">
          WHY WE NEED A THIRD PLACE?
        </h2>
      </div>
    </div>
  );
}

export default WhyNeed;
