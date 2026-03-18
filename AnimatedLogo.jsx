"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function PremiumLogo({ className = '' }) {
  const segments = [
    {
      id: 'm',
      d: 'M 14 100 L 14 18 L 40 54 L 66 18 L 66 64',
      width: 8,
      duration: 2,
      delay: 0,
    },
    {
      id: 'j',
      d: 'M 89 18 L 89 80 C 89 96 78 107 62 107 C 49 107 40 98 40 85',
      width: 8,
      duration: 2,
      delay: 0.12,
    },
    {
      id: 'wave',
      d: 'M 66 64 C 70 64 70 44 76 44 C 82 44 83 64 90 64 L 106 64',
      width: 6.6,
      duration: 1.6,
      delay: 0.42,
    },
    {
      id: 'cap',
      d: 'M 89 18 L 105 18 L 105 39',
      width: 6.8,
      duration: 1.2,
      delay: 0.3,
    },
  ];

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <div className={`premium-logo ${className}`.trim()}>
      <motion.svg
        className="premium-logo-svg"
        width="92"
        height="92"
        viewBox="0 0 120 120"
        fill="none"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="miter"
        initial="hidden"
        animate="visible"
        aria-label="MJ Logo"
      >
        <defs>
          <linearGradient id="mj-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e7fbff" />
            <stop offset="55%" stopColor="#d6f3ff" />
            <stop offset="100%" stopColor="#c3ecff" />
          </linearGradient>

          <filter id="mj-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.7" />
          </filter>
        </defs>

        {segments.map((segment) => (
          <g key={segment.id} fill="none" strokeLinecap="round" strokeLinejoin="miter">
            <motion.path
              d={segment.d}
              stroke="rgba(177, 231, 255, 0.45)"
              strokeWidth={segment.width + 3.2}
              filter="url(#mj-soft-glow)"
              variants={pathVariants}
              transition={{
                duration: segment.duration,
                delay: segment.delay,
                ease: [0.25, 1, 0.5, 1],
              }}
            />

            <motion.path
              d={segment.d}
              stroke="url(#mj-stroke)"
              strokeWidth={segment.width}
              variants={pathVariants}
              transition={{
                duration: segment.duration,
                delay: segment.delay,
                ease: [0.25, 1, 0.5, 1],
              }}
            />

            <motion.path
              d={segment.d}
              stroke="var(--logo-cut, #0b1120)"
              strokeWidth={Math.max(2.4, segment.width - 3)}
              variants={pathVariants}
              transition={{
                duration: segment.duration,
                delay: segment.delay,
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}
