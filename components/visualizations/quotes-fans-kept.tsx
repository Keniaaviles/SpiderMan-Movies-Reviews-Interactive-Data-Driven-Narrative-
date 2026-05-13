"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Quote {
  movie: string
  title: string
  rating: number
  helpful_votes: number
  total_votes: number
  date: string
  excerpt: string
}

interface QuotesData {
  description: string
  items: Quote[]
}

export function QuotesFansKeptAlive() {
  const [data, setData] = useState<QuotesData | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch("/data/quotes.json")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-pulse text-spidey-red">Loading quotes...</div>
      </div>
    )
  }

  // Take top 8 quotes
  const topQuotes = data.items.slice(0, 8)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topQuotes.map((quote, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="relative bg-spidey-darker/80 border border-border/30 rounded-lg p-5 cursor-pointer overflow-hidden"
              whileHover={{ 
                y: -4,
                boxShadow: "0 10px 40px rgba(239, 68, 68, 0.15)"
              }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Quote mark */}
              <div className="absolute top-2 left-3 text-4xl text-spidey-red/20 font-serif">{'"'}</div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <div className="text-white font-semibold mb-2 pr-16">
                  {quote.title}
                </div>
                
                {/* Excerpt */}
                <div className={`text-sm text-muted-foreground mb-3 ${
                  expandedIndex === index ? "" : "line-clamp-3"
                }`}>
                  {quote.excerpt}
                </div>
                
                {/* Movie tag */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-spidey-red/20 text-spidey-red rounded-full">
                    {quote.movie.replace("Spider-Man: ", "").replace("The Amazing ", "TASM ")}
                  </span>
                  {quote.rating > 0 && (
                    <span className="text-xs text-yellow-500">
                      {quote.rating}/10
                    </span>
                  )}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-spidey-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="text-spidey-blue font-medium">{quote.helpful_votes.toLocaleString()}</span> helpful
                    </span>
                    <span className="text-muted-foreground/60">
                      of {quote.total_votes.toLocaleString()} votes
                    </span>
                  </div>
                  <span className="text-muted-foreground/60">{quote.date}</span>
                </div>
              </div>

              {/* Expand indicator */}
              <motion.div 
                className="absolute top-4 right-4 text-muted-foreground/40"
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-spidey-red/5 to-spidey-blue/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
