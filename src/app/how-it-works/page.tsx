"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen text-black flex justify-center px-2">
      <div className="max-w-xl w-full pt-4 pb-10 space-y-8">

        {/* ───────── Header row ───────── */}
        <div className="flex items-center justify-between pb-2 border-b border-black/20">
          <Link href="/dashboard/profile" aria-label="Back" className="w-10 flex justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              className="w-6 h-6 text-black hover:text-pink-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>

          <div className="flex-1 flex justify-center">
            <span className="font-medium text-[20px]">HOW IT WORKS?</span>
          </div>

          <div className="w-10" />
        </div>

        {/* ───────── Body copy ───────── */}
        <section className="space-y-6 ml-2 mr-2 font-serif leading-relaxed">

          <h2 className="font-[500] text-lg">
            Real connections in 3 easy steps.
          </h2>

          {/* Step 1 */}
          <div className="space-y-1">
            <div className="flex gap-2 items-baseline">
              <span className="font-[500] text-lg">1.</span>
              <span className="font-[500] text-lg">Tell Us About You</span>
            </div>
            <p>
              Take a short personality test—so we can curate experiences tailored just for you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-1">
            <div className="flex gap-2 items-baseline">
              <span className="font-[500] text-lg">2.</span>
              <span className="font-[500] text-lg">Get Matched</span>
            </div>
            <p>
              Our algorithm connects you with strangers you’ll vibe with for epic evenings and deep conversations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-1">
            <div className="flex gap-2 items-baseline">
              <span className="font-[500] text-lg">3.</span>
              <span className="font-[500]d text-lg">Show Up. Let the Magic Unfold.</span>
            </div>
            <p>
              Join hand-picked events, show up, and spark genuine connections.
              Real people, real moments, real life—this is where the magic happens.
            </p>
          </div>

        </section>
      </div>
    </div>
  );
}
