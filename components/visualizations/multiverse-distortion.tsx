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
  const moviesWithDistortion = data.movies.map(movie => ({
    ...movie,
    ratingDistortion: ((movie.avg_rating - avgRating) / avgRating) * 100,
    reviewDistortion: ((movie.review_count - avgReviews) / avgReviews) * 100,
    helpfulDistortion: ((movie.avg_helpful_votes - avgHelpful) / avgHelpful) * 100,
    totalDistortion: Math.abs((movie.avg_rating - avgRating) / avgRating) + 
                     Math.abs((movie.review_count - avgReviews) / avgReviews) +
                     Math.abs((movie.avg_helpful_votes - avgHelpful) / avgHelpful)
  })).sort((a, b) => b.totalDistortion - a.totalDistortion)

  const selectedData = selectedMovie 
    ? moviesWithDistortion.find(m => m.movie === selectedMovie) 
    : null

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Legend */}
      <div className="mb-8 flex flex-wrap justify-center gap-6 text-xs">
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

      {/* Portals Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {moviesWithDistortion.map((movie, index) => {
          const isSelected = selectedMovie === movie.movie
          const maxDistortion = Math.max(
            Math.abs(movie.ratingDistortion),
            Math.abs(movie.reviewDistortion),
            Math.abs(movie.helpfulDistortion)
          )
          
          // Portal size based on total distortion
          const portalSize = 80 + (movie.totalDistortion * 20)
          
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

                {/* Distortion indicator */}
                {maxDistortion > 50 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-spidey-red rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-[8px] font-bold text-white">!</span>
                  </motion.div>
                )}
              </div>

              {/* Movie title */}
              <div className="mt-3 text-center">
                <div className={`text-sm font-medium transition-colors ${
                  isSelected ? "text-white" : "text-foreground"
                }`}>
                  {movie.movie.replace("Spider-Man: ", "").replace("Spider-Man ", "").replace("The Amazing ", "")}
                </div>
                <div className="text-xs text-muted-foreground">{movie.release_year}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected movie details */}
      {selectedData && (
        <motion.div
          className="mt-8 p-6 bg-spidey-darker/80 border border-border/30 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-lg font-bold text-foreground mb-4">{selectedData.movie}</h4>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Rating */}
            <div className="text-center">
              <div className="text-2xl font-bold text-spidey-red">
                {selectedData.ratingDistortion >= 0 ? "+" : ""}{selectedData.ratingDistortion.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Rating vs Avg ({selectedData.avg_rating.toFixed(1)} vs {avgRating.toFixed(1)})
              </div>
              <div className={`text-xs mt-1 ${selectedData.ratingDistortion >= 0 ? "text-green-500" : "text-red-400"}`}>
                {selectedData.ratingDistortion >= 0 ? "Above" : "Below"} average
              </div>
            </div>

            {/* Reviews */}
            <div className="text-center">
              <div className="text-2xl font-bold text-spidey-blue">
                {selectedData.reviewDistortion >= 0 ? "+" : ""}{selectedData.reviewDistortion.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Reviews vs Avg ({selectedData.review_count.toLocaleString()} vs {Math.round(avgReviews).toLocaleString()})
              </div>
              <div className={`text-xs mt-1 ${selectedData.reviewDistortion >= 0 ? "text-green-500" : "text-red-400"}`}>
                {selectedData.reviewDistortion >= 0 ? "Above" : "Below"} average
              </div>
            </div>

            {/* Helpful */}
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {selectedData.helpfulDistortion >= 0 ? "+" : ""}{selectedData.helpfulDistortion.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Helpful vs Avg ({selectedData.avg_helpful_votes.toFixed(1)} vs {avgHelpful.toFixed(1)})
              </div>
              <div className={`text-xs mt-1 ${selectedData.helpfulDistortion >= 0 ? "text-green-500" : "text-red-400"}`}>
                {selectedData.helpfulDistortion >= 0 ? "Above" : "Below"} average
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-center text-xs text-muted-foreground">
        Click a portal to see detailed distortion metrics. Solid rings = above average, dashed = below average.
      </div>
    </div>
  )
}
