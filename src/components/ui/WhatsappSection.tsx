import Image from 'next/image'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

function WhatsappSection() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl md:text-4xl mb-2">
          JOIN THE{' '}
          <span className="text-green-500 italic not-italic:font-normal">
            VIBE
          </span>
        </h2>
        <p className="text-white text-lg">Real talk. Real people, No small talk, just</p>
        <p className="text-white text-lg">a Whatsapp away</p>
      </div>

      <div className="relative flex items-center justify-center mb-8">
        {/* Subtle Glowing effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[310px] h-[520px] rounded-3xl blur-lg bg-white opacity-15" />
        </div>
        {/* Main Image */}
        <Image
          src="/whatsappimg.png"
          alt="Animated character"
          width={355}
          height={629}
          className="relative z-10 object-contain rounded-2xl"
          unoptimized
        />
      </div>

      <button
        className="flex items-center gap-3 bg-green-500 hover:bg-green-600 transition rounded-2xl px-8 py-3 shadow-lg text-white text-lg font-serif tracking-wide"
        style={{ minWidth: 220 }}
      >
        <FaWhatsapp className="text-2xl" />
        Join the community
        <span className="ml-2 text-2xl font-light">{'>'}</span>
      </button>
    </div>
  )
}

export default WhatsappSection
