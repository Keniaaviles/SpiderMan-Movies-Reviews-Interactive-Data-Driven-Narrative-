"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MovieMetric {
  movie: string
  release_year: number
  review_count: number
  avg_rating: number
  avg_helpful_votes: number
  spider_sense_score: number
}

interface MetricsData {
  movies: MovieMetric[]
}

export function SpiderSenseScoreboard() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch("/data/movie_metrics.json")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-pulse text-spidey-red">Calculating scores...</div>
      </div>
    )
  }

  // Sort by spider sense score descending
  const rankedMovies = [...data.movies].sort((a, b) => b.spider_sense_score - a.spider_sense_score)
  const maxScore = rankedMovies[0].spider_sense_score

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Score explanation */}
      <div className="mb-6 p-4 bg-spidey-darker/50 border border-border/20 rounded-lg">
        <div className="text-xs text-muted-foreground text-center">
          <span className="text-white font-medium">Spider-Sense Score</span> = 40% review count + 35% avg rating + 25% avg helpful votes
          <br />
          <span className="text-muted-foreground/60">All metrics normalized to dataset range before combining</span>
        </div>
      </div>

      {/* Ranking cards */}
      <div className="space-y-3">
        {rankedMovies.map((movie, index) => {
          const barWidth = (movie.spider_sense_score / maxScore) * 100
          const isTop3 = index < 3
          const isHovered = hoveredIndex === index
          
          return (
            <motion.div
              key={movie.movie}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
                  isHovered 
                    ? "border-spidey-red/50 bg-spidey-darker/90" 
                    : "border-border/20 bg-spidey-darker/50"
                }`}
                style={{
                  boxShadow: isTop3 && isHovered
                    ? `0 0 30px rgba(239, 68, 68, ${0.4 - index * 0.1})`
                    : "none"
                }}
              >
                {/* Progress bar background */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.08 }}
                  style={{
                    background: isTop3
                      ? `linear-gradient(90deg, rgba(239, 68, 68, ${0.3 - index * 0.08}) 0%, rgba(59, 130, 246, ${0.2 - index * 0.05}) 100%)`
                      : "rgba(239, 68, 68, 0.08)"
                  }}
                />

                {/* Content */}
                <div className="relative p-4 flex items-center gap-4">
                  {/* Rank badge */}
                  <motion.div 
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 
                        ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-black"
                        : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-400 text-black"
                          : index === 2
                            ? "bg-gradient-to-br from-amber-600 to-amber-700 text-black"
                            : "bg-spidey-darker border border-border/30 text-muted-foreground"
                    }`}
                    animate={isTop3 && isHovered ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    #{index + 1}
                  </motion.div>

                  {/* Movie info */}
                  <div className="flex-grow min-w-0">
                    <div className={`font-semibold truncate transition-colors duration-300 ${
                      isHovered ? "text-white" : "text-foreground"
                    }`}>
                      {movie.movie}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {movie.release_year}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-center hidden sm:block">
                      <div className="text-muted-foreground/60">Reviews</div>
                      <div className="text-spidey-red font-medium">{movie.review_count.toLocaleString()}</div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="text-muted-foreground/60">Rating</div>
                      <div className="text-yellow-500 font-medium">{movie.avg_rating.toFixed(1)}</div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="text-muted-foreground/60">Helpful</div>
                      <div className="text-spidey-blue font-medium">{movie.avg_helpful_votes.toFixed(1)}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <motion.div 
                    className={`flex-shrink-0 text-right ${
                      isTop3 ? "text-white" : "text-foreground"
                    }`}
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  >
                    <div className={`text-2xl font-bold ${
                      index === 0 ? "text-yellow-500" : ""
                    }`}>
                      {movie.spider_sense_score.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Score
                    </div>
                  </motion.div>
                </div>

                {/* Top 3 glow effect */}
                {isTop3 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      boxShadow: isHovered ? [
                        "inset 0 0 20px rgba(239, 68, 68, 0.2)",
                        "inset 0 0 40px rgba(239, 68, 68, 0.3)",
                        "inset 0 0 20px rgba(239, 68, 68, 0.2)"
                      ] : "inset 0 0 0px rgba(239, 68, 68, 0)"
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
