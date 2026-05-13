"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-spidey-red via-spidey-blue to-spidey-red origin-left z-50"
      style={{ scaleX }}
    />
  )
}

export function SectionIndicator({ 
  sections 
}: { 
  sections: Array<{ id: string; label: string }> 
}) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="space-y-4">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group flex items-center gap-3"
            >
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-right w-24">
                {section.label}
              </span>
              <span className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-spidey-red transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
