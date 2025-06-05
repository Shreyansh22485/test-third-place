"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <nav className="bg-black bg-opacity-80 text-white backdrop-blur-md px-4 md:px-6 lg:px-8 flex items-center justify-between relative">
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
      </div>      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
        <Link href="/about-us" className="hover:text-pink-400 transition-colors font-semibold">About Us</Link>
        <Link href="/sign-in" className="hover:text-pink-400 transition-colors font-semibold">Login / Sign up</Link>
        <Link href="/howitworks" className="hover:text-pink-400 transition-colors font-semibold">How It Works?</Link>
        <Link href="/events" className="hover:text-pink-400 transition-colors font-semibold">Upcoming events</Link>
        <Link href="/events" className="hover:text-pink-400 transition-colors font-semibold">Become a partner</Link>
        <Link href="/contact-us" className="hover:text-pink-400 transition-colors font-semibold">Contact us</Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className="lg:hidden flex justify-center items-center w-11 h-11 cursor-pointer"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen ? (
          // Hamburger Icon
          <div className="flex flex-col  items-center">
            <span className="block w-6 h-0.5 bg-white rounded mb-2"></span>
            <span className="block w-6 h-0.5 bg-white rounded mb-2"></span>
            <span className="block w-6 h-0.5 bg-white rounded"></span>
          </div>
        ) : (
          // Close Icon (X)
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-start py-4 z-50 lg:hidden border-t-4 border-black shadow-lg h-screen w-full pt-8">
          {/* Close (X) Button at the top right */}
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white-400 transition"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>          <Link href="/about-us" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-left ml-5 mt-8">About Us</Link>
          <Link href="/sign-in" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-left ml-5">Login /Sign up</Link>
          <Link href="/howitworks" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-left ml-5">How It Works?</Link>
          <Link href="/events" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-left ml-5">Upcoming Events</Link>
          <Link href="/about" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-left ml-5">Become a partner</Link>
          <Link href="/contact-us" className="py-2 text-white font-semibold hover:text-pink-400 w-full text-left ml-5">Contact us</Link>
          <div className="flex space-x-4 justify-center min-w-screen mt-20 mb-2">
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
        </div>
      )}
    </nav>
  );
}

export default Header;
