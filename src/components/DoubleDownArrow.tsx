"use client"
import React from 'react';
import { motion } from 'framer-motion';

const DoubleDownArrow = () => (
  <motion.div
    className="flex justify-center items-center bg-black w-full  mb-10 mt-10"
    animate={{ y: [0, 10, 0, -10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="15,22 30,37 45,22"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15,32 30,47 45,32"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
);

export default DoubleDownArrow;
