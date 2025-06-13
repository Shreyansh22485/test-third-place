"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* ---------- slide data ---------- */
const slides = [
  {
    id: 1,
    title: "TELL US ABOUT YOU",
    description:
      "Take a quick personality test — so we can match you with the right people and the right vibes.",
    image: "/step1.gif",
  },
  {
    id: 2,
    title: "GET MATCHED",
    description:
      "Our algorithm matches you with amazing people for unforgettable evenings and deep conversations.",
    image: "/step2-ezgif.com-reverse.gif",
  },
  {
    id: 3,
    title: "SHOW UP & LET THE MAGIC HAPPEN",
    description:
      "Join curated experiences, meet real people, and spark something real—right here, in real life. ✨",
    image: "/step3-ezgif.com-crop.gif",
  },
];

/* ---------- sizing ---------- */
const CARD_W = 270;
const CARD_H = 320;
const PEEK   = 40; // slice of the neighbour you want to see

/* ---------- helpers ---------- */
const clamp = (v: number, max: number) => Math.max(0, Math.min(v, max));

export default function StepCarousel() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);          // -1 back, 1 next
  const lock        = useRef(false);

  const next = () => setIdx(i => clamp(i + 1, slides.length - 1));
  const prev = () => setIdx(i => clamp(i - 1, slides.length - 1));

  /* ---------- swipe ---------- */
  const swipeHandlers = useSwipeable({
    onSwipedLeft:  () => { setDir( 1); next(); },
    onSwipedRight: () => { setDir(-1); prev(); },
    trackMouse: true,
    delta: 10,
    preventScrollOnSwipe: true,
  });

  /* ---------- wheel ---------- */
  const onWheel = (e: React.WheelEvent) => {
    if (lock.current) return;
    if (Math.abs(e.deltaX) < 15 && Math.abs(e.deltaY) < 15) return;
    lock.current = true;
    e.deltaX > 0 || e.deltaY > 0 ? (setDir(1), next()) : (setDir(-1), prev());
    setTimeout(() => (lock.current = false), 350);
  };

  /* ---------- framer variants ---------- */
  const variants = {
    enter : (d: number) => ({ x: d > 0 ? CARD_W : -CARD_W, opacity: 0 }),
    center:              { x: 0,                              opacity: 1 },
    exit  : (d: number) => ({ x: d > 0 ? -CARD_W :  CARD_W, opacity: 0 }),
  };

  /* ---------- card ---------- */
  const Card = ({ step }: { step: (typeof slides)[0] }) => (
    <div
      className="rounded-2xl shadow-sm flex flex-col items-center px-4 py-5 bg-[#FAF0E5]"
      style={{ width: CARD_W, height: CARD_H }}
      {...swipeHandlers}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-[16px] mb-3 select-none ${dmSans.className}`}
      >
        {step.id}
      </div>
      <h3 className="text-center text-[18px] font-medium mb-1 select-none">
        {step.title}
      </h3>
      <p className="text-center text-[14px] leading-relaxed mb-3 select-none">
        {step.description}
      </p>
      <div className="relative flex-1 w-full pointer-events-none -mb-12">
        <Image
          src={step.image}
          alt={`Step ${step.id}`}
          fill
          style={{ objectFit: "contain" }}
          unoptimized
          priority={step.id === 1}
        />
      </div>
    </div>
  );

  /* ---------- progress ---------- */
  const pct = ((idx + 1) / slides.length) * 100;

  return (
    <div
      className="flex flex-col items-center w-full bg-white space-y-4 select-none"
      {...swipeHandlers}
      onWheel={onWheel}
      style={{ touchAction: "pan-y pinch-zoom" }}
    >
      {/* Headings */}
      <h1 className="text-black text-[28px] sm:text-3xl mt-12 text-center">
        HOW IT <span className="italic">WORKS?</span>
      </h1>
      <h2 className="text-black text-center text-[15px] sm:text-base -mt-3">
        Real connection in 3 easy steps
      </h2>

      {/* Progress bar */}
      <div className="w-[240px] h-px bg-[#E5E5E5] rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* -------- Carousel frame (same size) -------- */}
      <div
        className="relative overflow-hidden"
        style={{ width: CARD_W, height: CARD_H }}
      >
        {/* Left neighbour peek */}
        {idx > 0 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateX(-${CARD_W - PEEK}px)`,
              zIndex: 0,
            }}
          >
            <Card step={slides[idx - 1]} />
          </div>
        )}

        {/* Current card with animation */}
        <AnimatePresence custom={dir} initial={false} mode="popLayout">
          <motion.div
            key={slides[idx].id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <Card step={slides[idx]} />
          </motion.div>
        </AnimatePresence>

        {/* Right neighbour peek */}
        {idx < slides.length - 1 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateX(${CARD_W - PEEK}px)`,
              zIndex: 0,
            }}
          >
            <Card step={slides[idx + 1]} />
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        href="/sign-up"
        className="w-[210px] mb-14 mt-4 bg-black h-[40px] text-white rounded-xl py-1.5 text-[18px] hover:bg-gray-800 transition-colors flex items-center justify-center"
      >
        START YOUR JOURNEY
      </Link>
    </div>
  );
}
