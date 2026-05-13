"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MovieMetric {
  movie: string
  release_year: number
  review_count: number
  avg_rating: number
  avg_helpful_votes: number
}

interface MetricsData {
  movies: MovieMetric[]
}

export function CitySkyline() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [hoveredMovie, setHoveredMovie] = useState<MovieMetric | null>(null)

  useEffect(() => {
    fetch("/data/movie_metrics.json")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-pulse text-spidey-red">Building skyline...</div>
      </div>
    )
  }

  const maxReviews = Math.max(...data.movies.map(m => m.review_count))
  const maxHelpful = Math.max(...data.movies.map(m => m.avg_helpful_votes))
  const sortedMovies = [...data.movies].sort((a, b) => a.release_year - b.release_year)

  return (
    <div className="w-full relative">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-spidey-darker via-spidey-dark to-spidey-darker" />
      
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Buildings container */}
      <div className="relative flex items-end justify-center gap-3 h-[450px] px-4 pt-16">
        {sortedMovies.map((movie, index) => {
          const heightPercent = (movie.review_count / maxReviews) * 100
          const buildingHeight = Math.max(100, heightPercent * 2.8)
          const windowBrightness = movie.avg_helpful_votes / maxHelpful
          const isHovered = hoveredMovie?.movie === movie.movie
          
          // Building dimensions
          const buildingWidth = 60
          const windowRows = Math.floor(buildingHeight / 25)
          const windowCols = 3
          
          return (
            <motion.div
              key={movie.movie}
              className="relative cursor-pointer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: buildingHeight, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Building structure */}
              <div 
                className="relative transition-all duration-300"
                style={{ 
                  width: buildingWidth,
                  height: buildingHeight,
                  transform: isHovered ? "scale(1.05)" : "scale(1)"
                }}
              >
                {/* Building body */}
                <div 
                  className="absolute inset-0 rounded-t-sm"
                  style={{
                    background: isHovered 
                      ? "linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)"
                      : "linear-gradient(180deg, #0f0f1a 0%, #0a0a12 100%)",
                    boxShadow: isHovered 
                      ? "0 0 30px rgba(239, 68, 68, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)"
                      : "inset 0 0 20px rgba(0,0,0,0.5)"
                  }}
                >
                  {/* Windows grid */}
                  <div className="absolute inset-2 grid gap-1" style={{ 
                    gridTemplateColumns: `repeat(${windowCols}, 1fr)`,
                    gridTemplateRows: `repeat(${windowRows}, 1fr)`
                  }}>
                    {Array.from({ length: windowRows * windowCols }).map((_, i) => {
                      const isLit = Math.random() < windowBrightness * 0.8 + 0.2
                      return (
                        <motion.div
                          key={i}
                          className="rounded-[1px]"
                          style={{
                            background: isLit 
                              ? isHovered
                                ? `rgba(${Math.random() > 0.5 ? "239, 68, 68" : "59, 130, 246"}, ${0.4 + windowBrightness * 0.4})`
                                : `rgba(255, 200, 100, ${0.1 + windowBrightness * 0.3})`
                              : "rgba(0,0,0,0.3)",
                            boxShadow: isLit && isHovered
                              ? `0 0 8px rgba(${Math.random() > 0.5 ? "239, 68, 68" : "59, 130, 246"}, 0.5)`
                              : "none"
                          }}
                          animate={isLit && isHovered ? {
                            opacity: [0.6, 1, 0.6],
                          } : {}}
                          transition={{
                            duration: 1 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 0.5
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* Rooftop rating glow */}
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-bold"
                    style={{
                      background: isHovered 
                        ? "linear-gradient(90deg, rgba(239, 68, 68, 0.8), rgba(59, 130, 246, 0.8))"
                        : "rgba(239, 68, 68, 0.6)",
                      boxShadow: isHovered
                        ? "0 0 15px rgba(239, 68, 68, 0.6)"
                        : "0 0 8px rgba(239, 68, 68, 0.3)"
                    }}
                    animate={isHovered ? {
                      boxShadow: [
                        "0 0 15px rgba(239, 68, 68, 0.6)",
                        "0 0 25px rgba(239, 68, 68, 0.8)",
                        "0 0 15px rgba(239, 68, 68, 0.6)"
                      ]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {movie.avg_rating.toFixed(1)}
                  </motion.div>
                </div>

                {/* Year label at bottom */}
                <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-muted-foreground/60"
                }`}>
                  {movie.release_year}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Ground line */}
      <div className="absolute bottom-8 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredMovie && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-spidey-darker/95 border border-spidey-red/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-white font-bold mb-2">{hoveredMovie.movie}</div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-spidey-red font-bold text-lg">{hoveredMovie.review_count.toLocaleString()}</div>
                  <div className="text-muted-foreground">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-500 font-bold text-lg">{hoveredMovie.avg_rating.toFixed(1)}</div>
                  <div className="text-muted-foreground">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-spidey-blue font-bold text-lg">{hoveredMovie.avg_helpful_votes.toFixed(1)}</div>
                  <div className="text-muted-foreground">Helpful</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
