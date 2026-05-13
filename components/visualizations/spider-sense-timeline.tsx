"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineItem {
  period: string
  reviews: number
  top_movie: string
  top_movie_reviews: number
}

interface TimelineData {
  description: string
  items: TimelineItem[]
}

export function SpiderSenseTimeline() {
  const [data, setData] = useState<TimelineData | null>(null)
  const [hoveredItem, setHoveredItem] = useState<TimelineItem | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch("/data/timeline.json")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-pulse text-spidey-red">Loading timeline...</div>
      </div>
    )
  }

  // Group by year for a cleaner view
  const yearlyData: { year: string; reviews: number; topMonth: TimelineItem }[] = []
  const yearMap = new Map<string, { total: number; topMonth: TimelineItem }>()
  
  data.items.forEach(item => {
    const year = item.period.split("-")[0]
    const existing = yearMap.get(year)
    if (existing) {
      existing.total += item.reviews
      if (item.reviews > existing.topMonth.reviews) {
        existing.topMonth = item
      }
    } else {
      yearMap.set(year, { total: item.reviews, topMonth: item })
    }
  })

  yearMap.forEach((value, year) => {
    yearlyData.push({ year, reviews: value.total, topMonth: value.topMonth })
  })

  const maxReviews = Math.max(...yearlyData.map(d => d.reviews))

  return (
    <div className="w-full py-8">
      {/* Timeline container */}
      <div className="relative">
        {/* Central timeline line */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-spidey-red/50 to-transparent" />
        
        {/* Pulse points */}
        <div className="flex justify-between items-center px-4 relative">
          {yearlyData.map((item, index) => {
            const size = 20 + (item.reviews / maxReviews) * 60
            const intensity = 0.3 + (item.reviews / maxReviews) * 0.7
            
            return (
              <motion.div
                key={item.year}
                className="relative flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => {
                  setHoveredItem(item.topMonth)
                  setHoveredIndex(index)
                }}
                onMouseLeave={() => {
                  setHoveredItem(null)
                  setHoveredIndex(null)
                }}
              >
                {/* Year label */}
                <div className={`text-xs mb-4 transition-colors duration-300 ${
                  hoveredIndex === index ? "text-white" : "text-muted-foreground"
                }`}>
                  {item.year}
                </div>
                
                {/* Pulse circle */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer glow rings */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: size + 30,
                      height: size + 30,
                      left: -(size + 30) / 2 + size / 2,
                      top: -(size + 30) / 2 + size / 2,
                      background: `radial-gradient(circle, rgba(239, 68, 68, ${intensity * 0.3}) 0%, transparent 70%)`
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  />
                  
                  {/* Inner pulse */}
                  <motion.div
                    className="rounded-full border-2 flex items-center justify-center"
                    style={{
                      width: size,
                      height: size,
                      borderColor: hoveredIndex === index 
                        ? "rgba(239, 68, 68, 0.8)" 
                        : `rgba(239, 68, 68, ${intensity * 0.6})`,
                      background: hoveredIndex === index
                        ? `radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(59, 130, 246, 0.2) 100%)`
                        : `radial-gradient(circle, rgba(239, 68, 68, ${intensity * 0.3}) 0%, transparent 100%)`,
                      boxShadow: hoveredIndex === index
                        ? "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)"
                        : `0 0 ${20 * intensity}px rgba(239, 68, 68, ${intensity * 0.4})`
                    }}
                    animate={{
                      boxShadow: hoveredIndex === index ? [
                        "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
                        "0 0 50px rgba(239, 68, 68, 0.8), 0 0 80px rgba(59, 130, 246, 0.5)",
                        "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)"
                      ] : undefined
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className={`text-xs font-mono transition-colors duration-300 ${
                      hoveredIndex === index ? "text-white" : "text-white/70"
                    }`}>
                      {item.reviews > 1000 ? `${(item.reviews / 1000).toFixed(1)}K` : item.reviews}
                    </span>
                  </motion.div>
                </motion.div>
                
                {/* Review count label */}
                <div className={`text-xs mt-4 transition-all duration-300 ${
                  hoveredIndex === index ? "text-spidey-red font-medium" : "text-muted-foreground/60"
                }`}>
                  reviews
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredItem && hoveredIndex !== null && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-spidey-darker/90 border border-spidey-red/30 rounded-lg p-4 backdrop-blur-sm max-w-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-2">
                  Peak: {hoveredItem.period}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="text-spidey-red font-medium">{hoveredItem.reviews.toLocaleString()}</span> reviews this month
                </div>
                <div className="text-xs text-spidey-blue">
                  Top movie: {hoveredItem.top_movie}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
