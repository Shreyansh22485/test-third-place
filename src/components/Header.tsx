"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black bg-opacity-80  backdrop-blur-md px-4 md:px-6 lg:px-8 py-2 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Image
          src="/Logo_001-01.png"
          alt="Third Place Logo"
          width={100}
          height={30}
          className="object-contain brightness-0 invert"
          priority
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
        <Link href="/about-us" className="hover:text-pink-400 transition-colors font-semibold">About Us</Link>
          <Link href="/howitworks" className="hover:text-pink-400 transition-colors font-semibold">Login / Sign up</Link>
        <Link href="/howitworks" className="hover:text-pink-400 transition-colors font-semibold">How It Works?</Link>
        <Link href="/events" className="hover:text-pink-400 transition-colors font-semibold">Upcoming events</Link>
        <Link href="/events" className="hover:text-pink-400 transition-colors font-semibold">Become a partner</Link>
        <Link href="/contact-us" className="hover:text-pink-400 transition-colors font-semibold">Contact us</Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className="lg:hidden flex justify-center items-center w-9 h-9 cursor-pointer"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen ? (
          // Hamburger Icon
          <div className="flex flex-col items-center">
            <span className="block w-6 h-0.5 bg-white rounded mb-1"></span>
            <span className="block w-6 h-0.5 bg-white rounded mb-1"></span>
            <span className="block w-6 h-0.5 bg-white rounded"></span>
          </div>
        ) : (
          // Close Icon (X)
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-95 flex flex-col items-center py-4 z-50 lg:hidden border-t-4 border-pink-400 rounded-b-xl shadow-lg">
          <Link href="/about-us" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-center">About Us</Link>
             <Link href="/about" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-center">Login /Sign up</Link>
          <Link href="/howitworks" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-center">How It Works?</Link>
          <Link href="/events" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-center"> Upcoming Events</Link>
                         <Link href="/about" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-center">Become a partner</Link>
          <Link href="/contact-us" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-center">Contact us</Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
