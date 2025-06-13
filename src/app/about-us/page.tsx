"use client";

import React from "react";
import Link from "next/link";

function Page() {
  return (
    <div className="bg-white min-h-screen text-black flex justify-center px-2">
      <div className="max-w-xl w-full pt-4 ml-2 mr-2 pb-10 space-y-8">
        {/* ───────── Header row ───────── */}
        <div className="flex items-center justify-between pb-2 border-b border-black/20">
          {/* Back to home */}
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

          {/* Page title */}
          <div className="flex-1 flex justify-center">
            <span className="italic font-[500] text-[24px]">About us</span>
          </div>

          {/* Empty box for symmetry */}
          <div className="w-10" />
        </div>

        {/* ───────── Body copy ───────── */}
        <h2 className="text-[20px] font-semibold leading-snug">
          What is <em>Third Place?</em>
        </h2>

        <p className=" leading-relaxed -mt-5">
          we exist to create spaces where members meet new people through
          curated experiences &amp; deepen their relationships.
        </p>

        <p className=" leading-relaxed -mt-5">
          we won’t tolerate a future where we spend the majority of our time in
          a virtual world, losing out on meaningful connections and lasting
          experiences.
        </p>

        {/* italic bullet-style lines */}
        <div className="space-y-1 -mt-2 ">
          <p className=""> <span className="italic">this is not </span> a dating app.</p>
          <p className=""><span className="italic">this is not </span>  about likes or followers.</p>
          <p className=""><span className="italic">this is not </span> endless swiping.</p>
          <p className=""><span className="italic">this is not </span>  a place for judgments.</p>
          <p className=""><span className="italic">this is not </span>  just another distraction.</p>
          <p className=""><span className="italic">this is not </span>  professional networking.</p>
          <p className=""><span className="italic">this is not </span> a virtual escape.</p>
        </div>

        <p className="leading-relaxed">
          welcome to Third Place.&nbsp; A new way to connect— IRL.
        </p>

        <p className=" leading-relaxed">
          just say “yes” — and discover the people, places, and moments you were
          never supposed to miss.
        </p>
      </div>
    </div>
  );
}

export default Page;
