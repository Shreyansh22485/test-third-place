import React from 'react';
import Link from 'next/link';

function Page() {
  return (
    <div className="bg-white min-h-screen text-black flex justify-center px-2">
      <div className="max-w-md w-full pt-4 pb-10">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-black/30 pb-2 mb-6">
          {/* Left: SVG (clickable, goes home) */}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          </div>
          {/* Center: Contact Us italic */}
          <div className="flex-1 flex justify-center">
            <span className="italic font-semibold text-[18px]">Contact us</span>
          </div>
          {/* Right: empty for symmetry */}
          <div className="w-10"></div>
        </div>

        {/* Contact Details Section */}
        <div className="space-y-6">
          {/* Intro */}
          <div className="text-[15px] leading-snug">
            We&apos;re here to listen, not just reply.<br />
            <p className='mt-5'>
              Whether you&apos;re curious about our experiences, need support,<br />
              or simply want to say hello — we’re all ears.
            </p>
          </div>

          {/* General Inquiries */}
          <div>
            <h2 className="text-[16px] font-bold mb-1">General Inquiries</h2>
            <div className="text-[14px] mb-1">
              Have questions about how Third Place works or how to join an experience?
            </div>
            <div className="flex items-center gap-2 text-[14px]">
              <span>📩</span>
              <span className="font-semibold">Email:</span>
              <a href="mailto:hello@yourthirdplace.in" className="underline hover:text-pink-400">hello@yourthirdplace.in</a>
            </div>
          </div>

          {/* Partner With Us */}
          <div>
            <h2 className="text-[16px] font-bold mb-1">Partner with us</h2>
            <div className="text-[14px] mb-1">
              Host a Third Place experience.<br />
           <p className='mt-5'>  <span className="font-semibold">As a venue, community, host, brand, or creator,</span> you can co-create magic with us.</p> 
            </div>
            <div className="flex items-center gap-2 text-[14px] mt-3">
              <span>🤝</span>
              <span className="font-semibold">Email:</span>
              <a href="mailto:hello@yourthirdplace.in" className="underline hover:text-pink-400">hello@yourthirdplace.in</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-[16px] font-bold mb-3 mt-2">Support</h2>
            <div className="text-[14px] mb-4">
              Running into a technical issue or need help with your booking?
            </div>
            <div className="flex items-center gap-2 text-[14px] mb-1">
              <span>🛠️</span>
              <span className="font-semibold">Email:</span>
              <a href="mailto:support@yourthirdplace.in" className="underline hover:text-pink-400">support@yourthirdplace.in</a>
            </div>
            <div className="flex items-center gap-2 text-[14px] mb-1">
              <span>📞</span>
              <span className="font-semibold">call/WhatsApp:</span>
              <a href="tel:+916364124613" className="underline hover:text-pink-400">+91-6364124613</a>
            </div>
            <div className="text-xs text-gray-600 ml-6">
              (Available Mon–Sun, 10:00 AM – 9:00 PM IST)
            </div>
          </div>

          {/* Instagram (Optional: add section as needed) */}
          <div>
            <h2 className="text-[16px] font-bold mb-1">Prefer Instagram DMs?</h2>
            <div className="flex items-center gap-2 text-[14px]">
              <span>📲</span>
              <span className="font-semibold">DM us:</span>
              <a href="https://instagram.com/thirdplace.world" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400">@thirdplace.world</a>
            </div>
          </div>

          {/* Registered Office */}
          <div>
            <h2 className="text-[15px] font-bold mb-0.5">Registered Office</h2>
            <p className="flex items-start gap-2 text-[13px]">
              <span>🏢</span>
              <span>
                Unit 101, Oxford Towers, 139, HAL Old Airport Road, Kodihalli, Bangalore,<br />
                Karnataka, India, 560008
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
