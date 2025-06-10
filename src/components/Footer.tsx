import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-white py-5 -mt-4  lg:py-12 text-center px-2 text-black text-xs sm:text-sm">
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <Image
          src="/Logo_001-01.png"
          alt="Third Place Logo"
          width={90}
          height={25}
          className="object-contain mb-2"
          priority
        />

        {/* Crafted with love text */}
        <div className="flex items-center justify-center mb-3 -mt-5">
          <span className='text-[14px]'>Crafted with</span>
          {/* Orange heart SVG */}
          <svg
            className="mx-1"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="#FF7F50"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'inline', verticalAlign: 'middle' }}
          >
            <path d="M12 21s-6.5-5.7-8.6-8.1C1.2 10.1 1 7.7 2.7 6A5.1 5.1 0 0 1 7.9 5.9c1 .4 2 .9 2.1 2.1.1-1.2 1.1-1.7 2.1-2.1A5.1 5.1 0 0 1 21.3 6c1.7 1.7 1.5 4.1-.7 6.9C18.5 15.3 12 21 12 21z" />
          </svg>
          <span className='text-[16px]'>in Bengaluru, India</span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-2 mb-2">
          <Image
            src="/instalogo.png"
            alt="Instagram"
            width={28}
            height={25}
            className="object-contain"
            priority
          />
          <Image
            src="/xlogo.png"
            alt="X"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Gray line */}
      <div className="w-full flex justify-center -mt-2">
        <div className="h-px bg-gray-300 my-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg pl-8 pr-8"></div>
      </div>

      {/* Links Section - Responsive */}
      <div className="
        flex flex-col items-center space-y-2 mt-1
        md:flex-row md:justify-center md:items-center md:space-y-0 md:space-x-4 mb-2
      ">
        <a href="/about-us" className="hover:underline text-[14px] sm:text-sm">
          About us
        </a>
        <a href="/contact-us" className="hover:underline text-[14px] sm:text-sm">
          Contact us
        </a>
        <a href="/become-a-partner" className="hover:underline text-[14px] sm:text-sm">
          Become a partner
        </a>
        <a href="/privacy-policy" className="hover:underline text-[14px] sm:text-sm">
          Privacy policy
        </a>
        <a href="/terms-and-conditions" className="hover:underline text-[14px] sm:text-sm">
          Terms & conditions
        </a>
      </div>
      {/* Gray line */}
      <div className="w-full flex justify-center -mt-">
        <div className="h-px bg-gray-300 my-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg pl-8 pr-8"></div>
      </div>



      <p className="text-black text-xs"> &copy; {new Date().getFullYear()} Commygnus Technologies Pvt. Ltd. All rights reserved.</p>
    </footer>
  )
}

export default Footer
