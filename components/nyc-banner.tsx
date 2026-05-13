"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function NYCBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {/* NYC Background Image */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/360_F_254472908_istASE1GrVX3rJOoLiztdywqkB52Kx9t-Zvp5owgljsMobJOVz3awn9jPFmpONV.jpg"
          alt="New York City skyline"
          fill
          className="object-cover"
        />
        {/* Red/Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-spidey-red/30 via-transparent to-spidey-blue/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-spidey-darker via-spidey-darker/40 to-spidey-darker/60" />
      </motion.div>

      {/* Spider web corner decorations */}
      <svg className="absolute top-0 left-0 w-48 h-48 opacity-30" viewBox="0 0 200 200">
        <path d="M0,0 L100,100 M0,50 L75,100 M0,100 L100,100 M50,0 L100,75" stroke="currentColor" strokeWidth="1" className="text-spidey-red" fill="none"/>
        <path d="M0,0 Q50,50 0,100" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
        <path d="M0,0 Q75,25 100,0" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
      </svg>

      <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-30 rotate-180" viewBox="0 0 200 200">
        <path d="M0,0 L100,100 M0,50 L75,100 M0,100 L100,100 M50,0 L100,75" stroke="currentColor" strokeWidth="1" className="text-spidey-blue" fill="none"/>
        <path d="M0,0 Q50,50 0,100" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
        <path d="M0,0 Q75,25 100,0" stroke="currentColor" strokeWidth="0.5" className="text-spidey-blue" fill="none"/>
      </svg>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center px-4"
      >
        <div className="text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6"
          >
            <span className="text-glow-red">Every Spider-Man story starts with a city.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white font-bold leading-relaxed"
          >
            The reviews tell us what fans carried with them after leaving the theater.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
