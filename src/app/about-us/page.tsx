import React from 'react';

function Page() {
  return (
    <div className="bg-white min-h-screen text-black flex justify-center px-2">
      <div className="max-w-xl w-full pt-4 pb-10 space-y-8">
        {/* Header with SVG | Contact Us | Blank */}
        <div className="flex items-center justify-between pb-2 border-b border-black/20">
          {/* Left: SVG Arrow */}
          <div className="w-10 flex justify-start">
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
          </div>
          {/* Center: Italic Contact Us */}
          <div className="flex-1 flex justify-center">
            <span className="italic font-semibold text-lg sm:text-xl">About us</span>
          </div>
          {/* Right: Blank for symmetry */}
          <div className="w-10" />
        </div>

        {/* Intro */}
        <p className="mb-2 text-[15px] text-center">
          We&apos;re here to listen, not just reply.<br />
          Whether you&apos;re curious about our experiences, need support, or simply want to say hello — we’re all ears.
        </p>
        
        {/* Contact Sections */}
        <div className="space-y-6 mt-4">
          {/* General Inquiries */}
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-0.5">General Inquiries</h2>
            <p className="text-sm">Have questions about how Third Place works or how to join an experience?</p>
            <p className="flex items-center gap-2 mt-0.5 text-sm">
              <span>📩</span>
              <span className="font-medium">Email:</span>
              <a href="mailto:hello@yourthirdplace.in" className="underline hover:text-pink-400">hello@yourthirdplace.in</a>
            </p>
          </div>

          {/* Partner With Us */}
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-0.5">Partner With Us</h2>
            <p className="text-sm">
              Host a Third Place experience.<br />
              As a venue, community, host, brand, or creator, you can co-create magic with us.
            </p>
            <p className="flex items-center gap-2 mt-0.5 text-sm">
              <span>🤝</span>
              <span className="font-medium">Email:</span>
              <a href="mailto:hello@yourthirdplace.in" className="underline hover:text-pink-400">hello@yourthirdplace.in</a>
            </p>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-0.5">Support</h2>
            <p className="text-sm">Running into a technical issue or need help with your booking?</p>
            <p className="flex items-center gap-2 mt-0.5 text-sm">
              <span>🛠️</span>
              <span className="font-medium">Email:</span>
              <a href="mailto:support@yourthirdplace.in" className="underline hover:text-pink-400">support@yourthirdplace.in</a>
            </p>
            <p className="flex items-center gap-2 mt-0.5 text-sm">
              <span>📞</span>
              <span className="font-medium">Call/WhatsApp:</span>
              <a href="tel:+916364124613" className="underline hover:text-pink-400">+91-6364124613</a>
              <span className="text-xs text-gray-500">(Mon–Sun, 10:00 AM – 9:00 PM IST)</span>
            </p>
          </div>

          {/* Instagram */}
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-0.5">Prefer Instagram DMs?</h2>
            <p className="flex items-center gap-2 mt-0.5 text-sm">
              <span>📲</span>
              <span className="font-medium">DM us:</span>
              <a href="https://instagram.com/thirdplace.world" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400">@thirdplace.world</a>
            </p>
          </div>

          {/* Registered Office */}
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-0.5">Registered Office</h2>
            <p className="flex items-start gap-2 text-sm">
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
