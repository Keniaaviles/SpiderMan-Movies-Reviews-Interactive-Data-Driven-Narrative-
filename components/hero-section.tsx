"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spidey-yLAWfTuYKwBd2KCZjWB0i0WDFPygbv.jpg"
          alt="Spider-Man"
          fill
          className="object-cover object-top opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-spidey-darker/80 via-spidey-darker/60 to-spidey-darker" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Web pattern overlay */}
        <div className="absolute inset-0 web-pattern opacity-20" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-spidey-red/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-spidey-blue/20 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Spider web decorations */}
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-10" viewBox="0 0 200 200">
          <path d="M100,0 L100,200 M0,100 L200,100 M0,0 L200,200 M200,0 L0,200" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
        </svg>
        <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-10 rotate-45" viewBox="0 0 200 200">
          <path d="M100,0 L100,200 M0,100 L200,100 M0,0 L200,200 M200,0 L0,200" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
        </svg>
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Eyebrow text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-spidey-red uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium"
        >
          A Fan Data Story
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black text-foreground mb-8 leading-[0.9] tracking-tight"
        >
          <span className="block text-glow-red">SPIDER-MAN</span>
          <span className="block text-3xl md:text-5xl lg:text-6xl font-light text-muted-foreground mt-4">
            Through the Eyes of Fans
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Before Brand New Day swings into theaters, fans are already looking back. This site uses review data to see which Spider-Man films sparked the loudest reactions, the strongest ratings and the moments people still defend like it&apos;s opening night.
        </motion.p>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
        >
          {[
            { value: "21K+", label: "IMDb Reviews Analyzed" },
            { value: "9", label: "Films Covered" },
            { value: "3", label: "Spider-Men" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-spidey-red" />
        </motion.div>
      </motion.div>
    </section>
  )
}
