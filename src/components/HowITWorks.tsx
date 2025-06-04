"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";

/* ---------- slide data ---------- */
const slides = [
  {
    id: 1,
    title: "Tell Us About You",
    description:
      " Take a short personality test—so we can curate experiences tailored just for you.",
    image: "/step1.gif",
  },
  {
    id: 2,
    title: "Get Matched",
    description:
      "Our algorithm connects you with strangers you’ll vibe with for epic evenings and deep conversations.",
    image: "/step2-ezgif.com-reverse.gif",
  },
  {
    id: 3,
    title: "Show Up. Let the Magic Unfold",
    description:
      "Join handpicked events, show up, and spark genuine connections. Real people, real moments, and real life—this is where the magic happens.",
    image: "/step3-ezgif.com-crop.gif",
  },
];

/* width of the fixed card frame */
const CARD_W = 310;
const clamp = (v: number, max: number) => Math.max(0, Math.min(v, max));

export default function StepCarousel() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0); // -1 = back, 1 = forward
  const lock = useRef(false);        // stops wheel spam

  /* ---------- move helpers ---------- */
  const next  = () => setIdx((i) => clamp(i + 1, slides.length - 1));
  const prev  = () => setIdx((i) => clamp(i - 1, slides.length - 1));

  /* ---------- swipeable (touch / mouse / track-pad) ---------- */
  const swipe = useSwipeable({
    onSwipedLeft: () => { setDir(1);  next(); },
    onSwipedRight: () => { setDir(-1); prev(); },
    trackMouse: true,       // enables desktop drag
    trackTouch: true,       // enables phones/tablets
    delta: 30,              // min px before trigger
    preventScrollOnSwipe: true,
  });

  /* ---------- wheel (two-finger track-pad) ---------- */
  const onWheel = (e: React.WheelEvent) => {
    if (lock.current) return;
    const big = Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30;
    if (!big) return;

    lock.current = true;
    if (e.deltaX > 0 || e.deltaY > 0) { setDir(1);  next(); }
    else                              { setDir(-1); prev(); }
    setTimeout(() => (lock.current = false), 550); // unlock after animation
  };

  /* ---------- framer variants ---------- */
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? CARD_W : -CARD_W, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -CARD_W : CARD_W, opacity: 0 }),
  };

  /* ---------- mini card component ---------- */
  const Card = ({ step }: { step: typeof slides[number] }) => (
    <div
      className="w-[310px] h-[380px] rounded-2xl shadow-sm
                 flex flex-col items-center px-6 py-6"
      style={{ backgroundColor: "#FAF0E5" }}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black
                      text-white font-bold text-sm mb-4">
        {step.id}
      </div>
      <h3 className="text-center  text-[20px]  mb-3 leading-tight px-2">
        {step.title}
      </h3>
      <p className="text-center text-[14px] text-black  mb-4 leading-relaxed px-2">
        {step.description}
      </p>
      <div className="flex-1 flex items-end justify-center -mb-5 w-full">
        <Image
          src={step.image}
          alt={`Step ${step.id}`}
          width={323.23}
          height={189}
          className="object-contain"
          unoptimized
          priority={step.id === 1}
        />
      </div>
    </div>
  );

  /* ---------- progress bar ---------- */
  const pct = ((idx + 1) / slides.length) * 100;

  /* ---------- render ---------- */
  return (
    <div className="flex flex-col items-center w-full bg-white py-4 space-y-5">
      {/* headings */}
      <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold text-center font-serif">
        HOW IT <span className="italic">WORKS ?</span>
      </h1>
      <h2 className="text-black text-center">
        Real connection in 3 easy steps
      </h2>

      {/* progress */}
      <div className="w-[280px] h-px rounded-full bg-[#E5E5E5] overflow-hidden">
        <div className="h-full bg-black transition-all" style={{ width: `${pct}%` }} />
      </div>

      {/* frame */}
      <div
        {...swipe}                         /* swipeable props */
        onWheel={onWheel}                  /* track-pad wheel */
        className="relative w-[310px] h-[380px] overflow-hidden"
      >
        <AnimatePresence custom={dir}>
          <motion.div
            key={slides[idx].id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Card step={slides[idx]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      <div className="flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to step ${i + 1}`}
            onClick={() => { if (i === idx) return; setDir(i > idx ? 1 : -1); setIdx(i); }}
            className={`w-2 h-2 rounded-full transition-colors
                        ${i === idx ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {/* CTA */}
      <button className="w-[230px] mb-20 bg-black text-white italic rounded-xl py-3 px-1
                         text-[18px]   hover:bg-gray-800 transition-colors">
        START YOUR JOURNEY
      </button>
    </div>
  );
}
