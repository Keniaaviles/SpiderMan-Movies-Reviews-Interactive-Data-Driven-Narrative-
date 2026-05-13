"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo } from "react"

// Pre-defined particle positions to avoid hydration mismatch
const particleData = [
  { left: 12, top: 8, color: 'red', opacity: 0.35, duration: 3.5, delay: 0.2 },
  { left: 78, top: 15, color: 'blue', opacity: 0.42, duration: 4.2, delay: 0.8 },
  { left: 34, top: 23, color: 'red', opacity: 0.38, duration: 3.8, delay: 1.1 },
  { left: 92, top: 31, color: 'blue', opacity: 0.45, duration: 4.5, delay: 0.4 },
  { left: 56, top: 42, color: 'red', opacity: 0.33, duration: 3.2, delay: 1.5 },
  { left: 21, top: 55, color: 'blue', opacity: 0.48, duration: 4.8, delay: 0.6 },
  { left: 67, top: 62, color: 'red', opacity: 0.4, duration: 4.0, delay: 1.2 },
  { left: 45, top: 71, color: 'blue', opacity: 0.36, duration: 3.6, delay: 0.9 },
  { left: 88, top: 78, color: 'red', opacity: 0.44, duration: 4.4, delay: 1.8 },
  { left: 15, top: 85, color: 'blue', opacity: 0.41, duration: 4.1, delay: 0.3 },
  { left: 73, top: 92, color: 'red', opacity: 0.37, duration: 3.7, delay: 1.4 },
  { left: 38, top: 18, color: 'blue', opacity: 0.43, duration: 4.3, delay: 0.7 },
  { left: 82, top: 48, color: 'red', opacity: 0.39, duration: 3.9, delay: 1.6 },
  { left: 9, top: 67, color: 'blue', opacity: 0.46, duration: 4.6, delay: 0.5 },
  { left: 51, top: 33, color: 'red', opacity: 0.34, duration: 3.4, delay: 1.0 },
]

// Pre-calculated web line endpoints (rounded to avoid hydration mismatches)
const webLines = [
  { x2: 110, y2: 50 },
  { x2: 101.96, y2: 80 },
  { x2: 80, y2: 101.96 },
  { x2: 50, y2: 110 },
  { x2: 20, y2: 101.96 },
  { x2: -1.96, y2: 80 },
  { x2: -10, y2: 50 },
  { x2: -1.96, y2: 20 },
  { x2: 20, y2: -1.96 },
  { x2: 50, y2: -10 },
  { x2: 80, y2: -1.96 },
  { x2: 101.96, y2: 20 },
]

export function WebBackground() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0.3])

  const particles = useMemo(() => particleData, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated web strands */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0"
      >
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ opacity: 0.1 }}
        >
          {/* Radial web lines */}
          {webLines.map((line, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={line.x2}
              y2={line.y2}
              stroke="var(--spidey-red)"
              strokeWidth="0.2"
            />
          ))}
          {/* Concentric circles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={10 + i * 12}
              fill="none"
              stroke="var(--spidey-red)"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating particles */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0"
      >
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              backgroundColor: particle.color === 'red' ? 'var(--spidey-red)' : 'var(--spidey-blue)',
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
