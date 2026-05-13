"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface StickySectionProps {
  children: ReactNode
  title: string
  subtitle?: string
  index: number
  accentColor?: "red" | "blue"
}

export function StickySection({ 
  children, 
  title, 
  subtitle,
  index,
  accentColor = "red" 
}: StickySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const glowClass = accentColor === "red" ? "text-glow-red" : "text-glow-blue"
  const textColor = accentColor === "red" ? "text-spidey-red" : "text-spidey-blue"
  const borderColor = accentColor === "red" ? "border-spidey-red/30" : "border-spidey-blue/30"
  const bgGlow = accentColor === "red" ? "bg-spidey-red/5" : "bg-spidey-blue/5"

  return (
    <section 
      ref={ref}
      className="relative min-h-screen py-24 md:py-32"
    >
      {/* Background glow */}
      <div className={`absolute inset-0 ${bgGlow} opacity-50`} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Sticky text panel */}
          <motion.div 
            style={{ opacity, y }}
            className="lg:sticky lg:top-32"
          >
            {/* Section number */}
            <span className={`text-8xl md:text-9xl font-black ${textColor} opacity-20 absolute -left-4 -top-16`}>
              {String(index).padStart(2, '0')}
            </span>
            
            <div className="relative">
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight ${glowClass}`}>
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  {subtitle}
                </p>
              )}
            </div>
          </motion.div>

          {/* Content/Chart area */}
          <motion.div 
            style={{ opacity }}
            className={`bg-card/50 backdrop-blur-sm border ${borderColor} rounded-2xl p-6 md:p-8`}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
