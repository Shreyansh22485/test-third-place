import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-black py-8 lg:py-12 text-center px-2 text-white text-xs sm:text-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {/* Logo */}
          <Image
            src="/Logo_001-01.png"
            alt="Third Place Logo"
            width={110}
            height={25}
            className="object-contain brightness-0 invert mb-2"
            priority
          />

          {/* Social Icons */}
          <div className="flex space-x-4 -mt-4 mb-2">
            {/* Instagram */}
            <Image
              src="/instalogo.png"
              alt="Instagram"
              width={32}
              height={25}
              className="object-contain brightness-0 invert"
              priority
            />
            {/* X (Twitter) */}
            <Image
              src="/xlogo.png"
              alt="X"
              width={50}
              height={54}
              className="object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* Become a Partner */}
          <p className="mt-2 text-base text-white underline underline-offset-2">
            BECOME A PARTNER
          </p>
        </div>
      </div>

      {/* Minimal white horizontal line */}
      <div className="w-full h-px bg-white my-6"></div>

      {/* Links Section */}
      <div className="flex flex-row items-center justify-center gap-x-2 sm:gap-x-4 mb-6 flex-wrap">
        <a href="/privacy-policy" className="hover:underline text-xs sm:text-sm">
          PRIVACY POLICY
        </a>
        <span className="inline text-gray-400 mx-1">|</span>
        <a href="/terms-and-conditions" className="hover:underline text-xs sm:text-sm">
          TERMS AND CONDITION
        </a>
        <span className="inline text-gray-400 mx-1">|</span>
        <a href="/contact-us" className="hover:underline text-xs sm:text-sm">
          CONTACT US
        </a>
      </div>

      <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} Commygnus technologies Pvt. Ltd. All rights reserved.</p>
    </footer>
  )
}

export default Footer
