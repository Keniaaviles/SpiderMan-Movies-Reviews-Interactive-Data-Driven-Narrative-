"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface WordData {
  word: string
  count: number
  movie_spread: number
  top_movie: string
  top_movie_count: number
}

interface WebData {
  description: string
  items: WordData[]
}

export function FanMemoryWeb() {
  const [data, setData] = useState<WebData | null>(null)
  const [hoveredWord, setHoveredWord] = useState<WordData | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/data/word_web.json")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-pulse text-spidey-red">Loading web...</div>
      </div>
    )
  }

  // Take top 30 meaningful words and filter out common stop words
  const stopWords = ["some", "first", "him", "well", "which", "too", "other", "after", "two", "any", "now", "say", "know", "being", "over", "again", "ever", "lot", "i'm"]
  const filteredItems = data.items
    .filter(item => !stopWords.includes(item.word.toLowerCase()))
    .slice(0, 30)

  const maxCount = Math.max(...filteredItems.map(w => w.count))
  const maxSpread = Math.max(...filteredItems.map(w => w.movie_spread))

  // Position words in a web-like pattern
  const getWordPosition = (index: number, total: number) => {
    const rings = 4
    const wordsPerRing = Math.ceil(total / rings)
    const ring = Math.floor(index / wordsPerRing)
    const posInRing = index % wordsPerRing
    const angleOffset = ring * 0.3
    const angle = (posInRing / Math.ceil(wordsPerRing)) * Math.PI * 2 + angleOffset
    const radius = 120 + ring * 80
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Web background lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="-400 -300 800 600">
        {/* Radial web lines */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          return (
            <motion.line
              key={`radial-${i}`}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * 350}
              y2={Math.sin(angle) * 350}
              stroke="rgba(239, 68, 68, 0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          )
        })}
        
        {/* Concentric web circles */}
        {[100, 180, 260, 340].map((radius, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
            strokeDasharray="8 4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Connecting lines between words */}
        {filteredItems.slice(0, 20).map((word, i) => {
          const pos = getWordPosition(i, filteredItems.length)
          return (
            <motion.line
              key={`line-${i}`}
              x1="0"
              y1="0"
              x2={pos.x}
              y2={pos.y}
              stroke={hoveredWord?.word === word.word ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 255, 255, 0.08)"}
              strokeWidth={hoveredWord?.word === word.word ? 2 : 1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.03 }}
            />
          )
        })}
      </svg>

      {/* Center spider icon */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-spidey-red/20 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 20px rgba(239, 68, 68, 0.3)",
            "0 0 40px rgba(239, 68, 68, 0.5)",
            "0 0 20px rgba(239, 68, 68, 0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-spidey-red text-xs">🕷</span>
      </motion.div>

      {/* Word nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {filteredItems.map((word, index) => {
          const pos = getWordPosition(index, filteredItems.length)
          const sizeScale = 0.6 + (word.count / maxCount) * 0.8
          const brightnessScale = 0.4 + (word.movie_spread / maxSpread) * 0.6
          
          return (
            <motion.div
              key={word.word}
              className="absolute cursor-pointer"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: [0, Math.random() * 4 - 2, 0],
                y: [0, Math.random() * 4 - 2, 0]
              }}
              transition={{ 
                duration: 0.5, 
                delay: 1.5 + index * 0.05,
                x: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.3, zIndex: 50 }}
              onMouseEnter={() => setHoveredWord(word)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <div
                className="relative -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-full transition-all duration-300"
                style={{
                  fontSize: `${Math.max(10, 12 * sizeScale)}px`,
                  color: hoveredWord?.word === word.word 
                    ? "#fff" 
                    : `rgba(255, 255, 255, ${brightnessScale})`,
                  textShadow: hoveredWord?.word === word.word
                    ? "0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)"
                    : `0 0 ${10 * brightnessScale}px rgba(239, 68, 68, ${brightnessScale * 0.5})`,
                  background: hoveredWord?.word === word.word 
                    ? "rgba(239, 68, 68, 0.2)" 
                    : "transparent"
                }}
              >
                {word.word}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredWord && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePos.x + 15,
              top: mousePos.y + 15
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-spidey-darker/95 border border-spidey-red/30 rounded-lg p-3 shadow-xl backdrop-blur-sm min-w-[180px]">
              <div className="text-white font-bold text-lg mb-1 capitalize">{hoveredWord.word}</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Mentions:</span>
                  <span className="text-spidey-red font-medium">{hoveredWord.count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Movies:</span>
                  <span className="text-spidey-blue font-medium">{hoveredWord.movie_spread}</span>
                </div>
                <div className="pt-1 border-t border-border/30">
                  <span className="text-xs">Most in: </span>
                  <span className="text-xs text-white">{hoveredWord.top_movie}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
