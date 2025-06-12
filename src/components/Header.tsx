"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Header */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white backdrop-blur-md px-4 md:px-6 lg:px-8 flex items-center justify-between h-18 lg:h-auto z-50">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/Logo_001-01.png"
            alt="Third Place Logo"
            width={80}
            height={30}
            className="object-contain brightness-0 invert"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="/about-us" className="hover:text-pink-400 transition-colors font-semibold">About Us</Link>
          <Link href="/sign-in" className="hover:text-pink-400 transition-colors font-semibold">Login / Sign up</Link>
          <Link href="/" className="hover:text-pink-400 transition-colors font-semibold">How It Works?</Link>
          <Link href="/dashboard" className="hover:text-pink-400 transition-colors font-semibold">Upcoming events</Link>
          <a
            href="https://thirdplace.typeform.com/to/iPAmuKne"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors font-semibold"
          >
            Become a partner
          </a>
          <Link href="/contact-us" className="hover:text-pink-400 transition-colors font-semibold">Contact us</Link>
        </div>

        {/* Mobile Hamburger/Cross Icon */}
        <button
          className="lg:hidden flex justify-center items-center w-11 h-11 cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? (
            // Hamburger Icon (PNG)
            <Image
              src="/hamburger menu.png"
              alt="Open menu"
              width={22}
              height={22}
              className="object-contain"
              priority
            />
          ) : (
            // Cross (X) Icon, same size and position as hamburger
            <svg
              className="w-[30px] h-[30px] text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col pt-[72px] z-40 lg:hidden border-t-4 border-black shadow-lg h-screen w-full">
          {/* The pt-[72px] pushes the content below the fixed header (adjust if your header height changes) */}

          {/* Navigation Links */}
          <Link href="/about-us" className="py-2 text-white font-[200px] text-[22px] hover:text-pink-400 w-full text-left ml-5 mt-8" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/sign-in" className="py-2 text-white font-[200px] text-[22px] hover:text-pink-400 w-full text-left ml-5" onClick={() => setMenuOpen(false)}>Login /Sign up</Link>
          <Link href="/howitworks" className="py-2 text-white font-[200px] text-[22px] hover:text-pink-400 w-full text-left ml-5" onClick={() => setMenuOpen(false)}>How It Works?</Link>
          <Link href="/dashboard" className="py-2 text-white font-[200px] text-[22px] hover:text-pink-400 w-full text-left ml-5" onClick={() => setMenuOpen(false)}>Upcoming Events</Link>
          <a
            href="https://thirdplace.typeform.com/to/iPAmuKne"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 text-white font-[200px] text-[22px] hover:text-pink-400 w-full text-left ml-5"
            onClick={() => setMenuOpen(false)}
          >
            Become a partner
          </a>
          <Link href="/contact-us" className="py-2 text-white font-[200px] text-[22px] hover:text-pink-400 w-full text-left ml-5" onClick={() => setMenuOpen(false)}>Contact us</Link>
          <div className="flex space-x-4 justify-center min-w-screen mt-20 mb-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/yourthird_place"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instalogo.png"
                alt="Instagram"
                width={42}
                height={35}
                className="object-contain brightness-0 -mt-7 invert"
                priority
              />
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com/yourthird_place?s=21&t=O3S1XDNlqHREkrhP9CgP8w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/xlogo.png"
                alt="X"
                width={60}
                height={54}
                className="object-contain brightness-0 -mt-9 invert"
                priority
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
