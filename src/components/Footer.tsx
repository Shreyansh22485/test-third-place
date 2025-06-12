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
       <div className="flex items-center justify-center mb-3 -mt-5 space-x-1">
  <span className="text-[14px]">Crafted with</span>
  <span className="text-[16px]">🧡</span>
  <span className="text-[16px]">in Bengaluru, India</span>
   </div>


        {/* Social Icons */}
       <div className="flex space-x-2 mb-2">
  <a
    href="https://www.instagram.com/yourthird_place"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/instalogo.png"
      alt="Instagram"
      width={25}
      height={25}
      className="object-contain mt-2"
      priority
    />
  </a>
  <a
    href="https://x.com/yourthird_place?s=21&t=O3S1XDNlqHREkrhP9CgP8w"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/xlogo.png"
      alt="X"
      width={40}
      height={40}
      className="object-contain"
      priority
    />
  </a>
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
