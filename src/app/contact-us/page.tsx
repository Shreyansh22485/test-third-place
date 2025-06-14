import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header row */}
      <div className="w-full flex items-center justify-between pt-4 pb-2 px-4">
        <div className="w-10 flex justify-start">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-black hover:text-pink-400 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>
        <span className="italic font-[500] text-[24px]">CONTACT US</span>
        <div className="w-10" />
      </div>

      <hr className="border-[#E5E5EA]" />

      <div className="max-w-md w-full mx-auto px-4 mt-7  space-y-8">
        {/* Intro */}
        <div className="text-[16px] leading-relaxed">
          We&apos;re here to listen, not just reply.
          <p className="">
            Whether you&apos;re curious about our experiences, need support,
            <br />
            or simply want to say hello — we’re all ears.
          </p>
        </div>

        {/* General Inquiries */}
        <div className='-mt-5'>
          <h2 className="text-[20px] font-[500] leading-snug ">
            General Inquiries
          </h2>
          <div className="text-[16px]">
            Have questions about how Third Place works or how to join an experience?
          </div>
          <div className="flex items-center gap-2 text-[14px]">
            <span>📩</span>
            <span className="font-semibold">Email:</span>
            <a
              href="mailto:hello@yourthirdplace.in"
              className="underline hover:text-pink-400"
            >
              hello@yourthirdplace.in
            </a>
          </div>
        </div>

        {/* Partner with us */}
        <div>
          <h2 className="text-[20px] font-[500] -mt-4 leading-snug">
            Partner with us
          </h2>
          <div className="text-[16px]">
            Host a Third Place experience.
            <p className="">
              <span className="font-semibold ">
                As a venue, community, host, brand, or creator,
              </span>{' '}
              you can co-create magic with us.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[14px] ">
            <span>🤝</span>
            <span className="font-semibold">Email:</span>
            <a
              href="mailto:hello@yourthirdplace.in"
              className="underline hover:text-pink-400"
            >
              hello@yourthirdplace.in
            </a>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-[20px] font-[500] leading-snug -mt-4">
            Support
          </h2>
          <div className="text-[16px] mb-2">
            Running into a technical issue or need help with your booking?
          </div>
          <div className="flex items-center gap-2 text-[14px] mb-1">
           <span>📩</span>
            <span className="font-semibold">Email:</span>
            <a
              href="mailto:support@yourthirdplace.in"
              className="underline hover:text-pink-400"
            >
              support@yourthirdplace.in
            </a>
          </div>
          <div className="flex items-center gap-2 text-[14px] -mt-1 mb-1">
            <span>📞</span>
            <span className="font-semibold">call/WhatsApp:</span>
            <a
              href="tel:+916364124613"
              className="underline hover:text-pink-400"
            >
              +91-6364124613
            </a>
          </div>
          <div className="text-xs text-gray-600 ml-6">
            (Available Mon–Sun, 10:00 AM – 9:00 PM IST)
          </div>
        </div>

        {/* Instagram DMs */}
        <div>
          <h2 className="text-[20px] font-[500] -mt-4 leading-snug mb-1">
            Prefer Instagram DMs?
          </h2>
          <div className="flex items-center gap-2 text-[14px]">
            <span>📲</span>
            <span className="font-semibold">DM us:</span>
            <a
              href="https://www.instagram.com/yourthird_place"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-400"
            >
              @yourthird_place
            </a>
          </div>
        </div>

        {/* Registered Office */}
        <div>
          <h2 className="text-[20px] -mt-4 font-[500] leading-snug mb-0.5">
            Registered Office
          </h2>
          <p className="flex items-start gap-2 text-[13px]">
            <span>🏢</span>
            <span>
              Unit 101, Oxford Towers, 139, HAL Old Airport Road, Kodihalli,
              Bangalore,
              <br />
              Karnataka, India, 560008
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
