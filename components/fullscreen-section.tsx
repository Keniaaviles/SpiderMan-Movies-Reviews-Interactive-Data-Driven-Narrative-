"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface FullscreenSectionProps {
  children: ReactNode
  className?: string
  background?: "dark" | "darker" | "gradient-red" | "gradient-blue"
}

export function FullscreenSection({ 
  children, 
  className = "",
  background = "dark"
}: FullscreenSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  const bgClasses = {
    dark: "bg-spidey-dark",
    darker: "bg-spidey-darker",
    "gradient-red": "bg-gradient-to-b from-spidey-darker via-spidey-red/10 to-spidey-darker",
    "gradient-blue": "bg-gradient-to-b from-spidey-darker via-spidey-blue/10 to-spidey-darker"
  }

  return (
    <section 
      ref={ref}
      className={`relative min-h-screen flex items-center ${bgClasses[background]} ${className}`}
    >
      <motion.div 
        style={{ opacity, scale }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  )
}

interface TransitionSectionProps {
  quote: string
  author?: string
  accentColor?: "red" | "blue"
}

export function TransitionSection({ quote, author, accentColor = "red" }: TransitionSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const glowClass = accentColor === "red" ? "text-glow-red" : "text-glow-blue"
  const textColor = accentColor === "red" ? "text-spidey-red" : "text-spidey-blue"

  return (
    <section 
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center py-20"
    >
      {/* Background accent */}
      <div className={`absolute inset-0 ${accentColor === "red" ? "bg-spidey-red/5" : "bg-spidey-blue/5"}`} />
      
      <motion.div 
        style={{ scale, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <div className={`text-6xl md:text-8xl mb-8 ${textColor}`}>&ldquo;</div>
        <blockquote className={`text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight ${glowClass}`}>
          {quote}
        </blockquote>
        {author && (
          <cite className="block mt-8 text-lg text-muted-foreground not-italic">
            — {author}
          </cite>
        )}
      </motion.div>
    </section>
  )
}

interface StatsSectionProps {
  stats: Array<{
    value: string
    label: string
    change?: string
    positive?: boolean
  }>
  title?: string
}

export function StatsSection({ stats, title }: StatsSectionProps) {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
          >
            {title}
          </motion.h3>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-card/30 border border-border/50"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
              {stat.change && (
                <div className={`text-sm mt-2 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
