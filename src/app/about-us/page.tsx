"use client";

import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white min-h-screen text-black">
      <div className="w-full flex items-center justify-between pt-4 pb-2 px-4">
        <Link href="/" className="w-10 flex justify-start" aria-label="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-black hover:text-pink-400"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <span className="italic font-[500] text-[24px]">ABOUT US</span>
        <div className="w-10" />
      </div>

      <hr className="border-[#E5E5EA]" />

      <div className="max-w-xl w-full mx-auto px-4 mt-7 pb-10 space-y-8">
        <h2 className="text-[20px] font-[500] leading-snug">
          What is <em>Third Place?</em>
        </h2>

       

        <p className="leading-relaxed text-[16px] -mt-5">
          we won’t accept a future where we spend the majority of our time in
          a virtual world, losing out on meaningful connections and lasting
          experiences.
        </p>

        <div className="space-y-1 -mt-5">
          <p>
            <span className="italic">This is not </span> a dating app.
          </p>
          <p>
            <span className="italic">This is not </span> about likes or
            followers.
          </p>
          <p>
            <span className="italic">This is not </span> endless swiping.
          </p>
          <p>
            <span className="italic">this is not </span> a place for
            judgments.
          </p>
          <p>
            <span className="italic">This is not </span> just another
            distraction.
          </p>
           <p>
            <span className="italic">This is not </span> a virtual escape.
          </p>
          <p>
            <span className="italic">This is not </span> professional
            networking.
          </p>
          
        
          
        </div>

        <p className="leading-relaxed -mt-5">
          welcome to Third Place.&nbsp; A new way to connect,<br></br>
           IRL.
        </p>

        <p className="leading-relaxed -mt-5">
          just say “yes” — and discover the people, places, and moments you were
          never supposed to miss.
        </p>
      </div>
    </div>
  );
}
