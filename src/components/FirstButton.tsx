'use client';

import AuthLink from './AuthLink';

const JoinNowDiv = () => (
  <div className="flex justify-center items-center bg-black">
    <div className="border border-white rounded-2xl px-6 py-2 flex items-center justify-center">
      <AuthLink className="text-white text-[18px] font-serif w-[90px] tracking-wide cursor-pointer">
        SIGN UP
      </AuthLink>
    </div>
  </div>
);

export default JoinNowDiv;
