'use client';

import Link from 'next/link';

const JoinNowDiv = () => (
  <div className="flex justify-center items-center bg-black">
    <div className="border border-white rounded-2xl px-6 py-2 flex items-center justify-center">
      <Link href="/sign-up" passHref>
        <button className="text-white text-[18px] font-serif w-[90px] tracking-wide">
          SIGN UP
        </button>
      </Link>
    </div>
  </div>
);

export default JoinNowDiv;
