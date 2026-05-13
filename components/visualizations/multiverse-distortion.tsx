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

export function MultiverseDistortionRings() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/movie_metrics.json")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-pulse text-spidey-blue">Opening portals...</div>
      </div>
    )
  }

  // Calculate dataset averages
  const avgRating = data.movies.reduce((sum, m) => sum + m.avg_rating, 0) / data.movies.length
  const avgReviews = data.movies.reduce((sum, m) => sum + m.review_count, 0) / data.movies.length
  const avgHelpful = data.movies.reduce((sum, m) => sum + m.avg_helpful_votes, 0) / data.movies.length

  // Calculate distortion values (how far from average, as percentage)
  // Sort by release year (oldest to newest)
  const moviesWithDistortion = data.movies.map(movie => ({
    ...movie,
    ratingDistortion: ((movie.avg_rating - avgRating) / avgRating) * 100,
    reviewDistortion: ((movie.review_count - avgReviews) / avgReviews) * 100,
    helpfulDistortion: ((movie.avg_helpful_votes - avgHelpful) / avgHelpful) * 100,
    totalDistortion: Math.abs((movie.avg_rating - avgRating) / avgRating) + 
                     Math.abs((movie.review_count - avgReviews) / avgReviews) +
                     Math.abs((movie.avg_helpful_votes - avgHelpful) / avgHelpful)
  })).sort((a, b) => a.release_year - b.release_year)

  const selectedData = selectedMovie 
    ? moviesWithDistortion.find(m => m.movie === selectedMovie) 
    : null

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Two column layout - Portals on left, Details on right (sticky) */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Portals Grid */}
        <div className="flex-1">
          {/* Legend */}
          <div className="mb-6 flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-spidey-red" />
              <span className="text-muted-foreground">Rating vs Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-spidey-blue" />
              <span className="text-muted-foreground">Review Count vs Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Helpful Votes vs Average</span>
            </div>
          </div>

          {/* Portals Grid - 2 columns with large spacing */}
          <div className="grid grid-cols-2 gap-16 md:gap-20 p-6">
            {moviesWithDistortion.map((movie, index) => {
              const isSelected = selectedMovie === movie.movie
              const maxDistortion = Math.max(
                Math.abs(movie.ratingDistortion),
                Math.abs(movie.reviewDistortion),
                Math.abs(movie.helpfulDistortion)
              )
              
              // Portal size - smaller and uniform for better spacing
              const portalSize = 55 + (movie.totalDistortion * 8)
              
              return (
                <motion.div
                  key={movie.movie}
                  className="flex flex-col items-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedMovie(isSelected ? null : movie.movie)}
                >
                  {/* Portal */}
                  <div className="relative" style={{ width: portalSize, height: portalSize }}>
                    {/* Outer glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={isSelected ? {
                        boxShadow: [
                          "0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
                          "0 0 40px rgba(239, 68, 68, 0.7), 0 0 60px rgba(59, 130, 246, 0.5)",
                          "0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
                        ]
                      } : {
                        boxShadow: "0 0 10px rgba(239, 68, 68, 0.2), 0 0 20px rgba(59, 130, 246, 0.1)"
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* SVG Portal Rings */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                    >
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="rgba(10, 10, 18, 0.8)"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                      />

                      {/* Rating ring (red) */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={35 + Math.abs(movie.ratingDistortion) * 0.1}
                        fill="none"
                        stroke={movie.ratingDistortion >= 0 ? "#ef4444" : "#ef444480"}
                        strokeWidth={2 + Math.abs(movie.ratingDistortion) * 0.05}
                        strokeDasharray={movie.ratingDistortion >= 0 ? "none" : "5 3"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />

                      {/* Review count ring (blue) */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={25 + Math.abs(movie.reviewDistortion) * 0.05}
                        fill="none"
                        stroke={movie.reviewDistortion >= 0 ? "#3b82f6" : "#3b82f680"}
                        strokeWidth={2 + Math.abs(movie.reviewDistortion) * 0.02}
                        strokeDasharray={movie.reviewDistortion >= 0 ? "none" : "5 3"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      />

                      {/* Helpful votes ring (yellow) */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={15 + Math.abs(movie.helpfulDistortion) * 0.05}
                        fill="none"
                        stroke={movie.helpfulDistortion >= 0 ? "#eab308" : "#eab30880"}
                        strokeWidth={2 + Math.abs(movie.helpfulDistortion) * 0.02}
                        strokeDasharray={movie.helpfulDistortion >= 0 ? "none" : "5 3"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                      />

                      {/* Center point */}
                      <circle
                        cx="50"
                        cy="50"
                        r="4"
                        fill="white"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 bg-spidey-red rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <span className="text-[10px] font-bold text-white">&#10003;</span>
                      </motion.div>
                    )}

                    {/* Distortion indicator */}
                    {maxDistortion > 50 && !isSelected && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 bg-spidey-blue/80 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="text-[8px] font-bold text-white">!</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Movie title - full name */}
                  <div className="mt-3 text-center max-w-[120px]">
                    <div className={`text-xs font-medium transition-colors leading-tight ${
                      isSelected ? "text-white" : "text-foreground"
                    }`}>
                      {movie.movie}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{movie.release_year}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            Click a portal to see detailed distortion metrics. Solid rings = above average, dashed = below average.
          </div>
        </div>

        {/* Right column - Sticky Details Panel */}
        <div className="lg:w-80">
          <div className="lg:sticky lg:top-24">
            {selectedData ? (
              <motion.div
                className="p-6 bg-spidey-darker/90 border border-spidey-red/40 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={selectedData.movie}
              >
                <h4 className="text-lg font-bold text-foreground mb-4 border-b border-border/30 pb-3">{selectedData.movie}</h4>
                
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="p-3 bg-spidey-red/10 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Rating</span>
                      <span className={`text-xs ${selectedData.ratingDistortion >= 0 ? "text-green-500" : "text-red-400"}`}>
                        {selectedData.ratingDistortion >= 0 ? "Above" : "Below"} avg
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-spidey-red">
                      {selectedData.ratingDistortion >= 0 ? "+" : ""}{selectedData.ratingDistortion.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedData.avg_rating.toFixed(1)} vs {avgRating.toFixed(1)} avg
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="p-3 bg-spidey-blue/10 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Review Count</span>
                      <span className={`text-xs ${selectedData.reviewDistortion >= 0 ? "text-green-500" : "text-red-400"}`}>
                        {selectedData.reviewDistortion >= 0 ? "Above" : "Below"} avg
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-spidey-blue">
                      {selectedData.reviewDistortion >= 0 ? "+" : ""}{selectedData.reviewDistortion.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedData.review_count.toLocaleString()} vs {Math.round(avgReviews).toLocaleString()} avg
                    </div>
                  </div>

                  {/* Helpful */}
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Helpful Votes</span>
                      <span className={`text-xs ${selectedData.helpfulDistortion >= 0 ? "text-green-500" : "text-red-400"}`}>
                        {selectedData.helpfulDistortion >= 0 ? "Above" : "Below"} avg
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-500">
                      {selectedData.helpfulDistortion >= 0 ? "+" : ""}{selectedData.helpfulDistortion.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedData.avg_helpful_votes.toFixed(1)} vs {avgHelpful.toFixed(1)} avg
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="mt-4 w-full py-2 text-xs text-muted-foreground hover:text-white transition-colors border border-border/30 rounded-lg hover:border-spidey-red/50"
                >
                  Close Details
                </button>
              </motion.div>
            ) : (
              <div className="p-6 bg-spidey-darker/50 border border-border/20 rounded-xl text-center">
                <div className="text-4xl mb-3 opacity-30">&#128993;</div>
                <p className="text-sm text-muted-foreground">
                  Click on a portal to see how that movie compares to the dataset average
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
