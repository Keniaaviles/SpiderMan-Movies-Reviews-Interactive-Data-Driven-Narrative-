"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  })

  const words = text.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

function Word({ 
  children, 
  progress, 
  range 
}: { 
  children: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  const y = useTransform(progress, range, [20, 0])

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block"
    >
      {children}
    </motion.span>
  )
}

interface CharacterRevealProps {
  text: string
  className?: string
  stagger?: number
}

export function CharacterReveal({ text, className = "", stagger = 0.02 }: CharacterRevealProps) {
  const characters = text.split("")

  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * stagger, duration: 0.4 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

interface FadeInTextProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeInText({ children, delay = 0, className = "" }: FadeInTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
