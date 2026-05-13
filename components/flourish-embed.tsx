"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface FlourishEmbedProps {
  visualizationId: string
  title?: string
  description?: string
  height?: number
}

export function FlourishEmbed({ 
  visualizationId, 
  title,
  description,
  height = 500 
}: FlourishEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Flourish embed script
    const script = document.createElement('script')
    script.src = 'https://public.flourish.studio/resources/embed.js'
    script.async = true
    script.onload = () => setIsLoaded(true)
    document.body.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div className="space-y-4">
      {title && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden bg-spidey-dark/50"
        style={{ minHeight: height }}
      >
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-spidey-red border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading visualization...</span>
            </div>
          </div>
        )}
        
        {/* Flourish embed container */}
        <div 
          className="flourish-embed flourish-chart"
          data-src={`visualisation/${visualizationId}`}
          style={{ width: '100%', height }}
        >
          <noscript>
            <img 
              src={`https://public.flourish.studio/visualisation/${visualizationId}/thumbnail`} 
              width="100%" 
              alt={title || "Flourish visualization"}
            />
          </noscript>
        </div>
      </motion.div>
      
      {/* Interaction hint */}
      <p className="text-xs text-muted-foreground text-center">
        ↔ Interact with the chart above
      </p>
    </div>
  )
}

// Placeholder component for demo purposes
export function FlourishPlaceholder({ 
  title,
  description,
  chartType = "bar",
  height = 400
}: { 
  title?: string
  description?: string
  chartType?: "bar" | "line" | "pie" | "scatter"
  height?: number
}) {
  return (
    <div className="space-y-4">
      {title && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      
      <div 
        className="relative rounded-xl overflow-hidden bg-gradient-to-br from-spidey-dark to-spidey-darker border border-border/50"
        style={{ minHeight: height }}
      >
        {/* Placeholder visualization */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-full flex flex-col">
            {/* Mock chart based on type */}
            {chartType === "bar" && <MockBarChart />}
            {chartType === "line" && <MockLineChart />}
            {chartType === "pie" && <MockPieChart />}
            {chartType === "scatter" && <MockScatterChart />}
          </div>
        </div>
        
        {/* Embed instruction overlay */}
        <div className="absolute inset-0 bg-spidey-darker/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center p-6 max-w-sm">
            <p className="text-foreground font-medium mb-2">Flourish Chart Placeholder</p>
            <p className="text-sm text-muted-foreground">
              Replace with your Flourish embed using the visualization ID
            </p>
            <code className="mt-4 block text-xs bg-spidey-dark/50 p-2 rounded text-spidey-red">
              {`<FlourishEmbed visualizationId="YOUR_ID" />`}
            </code>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        ↔ Interactive Flourish chart
      </p>
    </div>
  )
}

function MockBarChart() {
  const bars = [65, 85, 45, 90, 70, 55, 80]
  return (
    <div className="flex items-end justify-around h-full gap-2 pt-8 pb-4">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
          className={`flex-1 max-w-12 rounded-t-lg ${i % 2 === 0 ? 'bg-spidey-red' : 'bg-spidey-blue'}`}
          style={{ opacity: 0.7 + (i % 3) * 0.1 }}
        />
      ))}
    </div>
  )
}

function MockLineChart() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
      <motion.path
        d="M 0 150 Q 50 120 100 100 T 200 80 T 300 60 T 400 40"
        fill="none"
        stroke="var(--spidey-red)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 170 Q 50 150 100 140 T 200 120 T 300 90 T 400 70"
        fill="none"
        stroke="var(--spidey-blue)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  )
}

function MockPieChart() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-48 h-48 rounded-full"
        style={{
          background: `conic-gradient(
            var(--spidey-red) 0deg 144deg,
            var(--spidey-blue) 144deg 252deg,
            var(--muted) 252deg 324deg,
            var(--spidey-red-glow) 324deg 360deg
          )`
        }}
      />
    </div>
  )
}

function MockScatterChart() {
  const points = [
    { x: 20, y: 60 }, { x: 40, y: 30 }, { x: 60, y: 70 },
    { x: 80, y: 40 }, { x: 120, y: 50 }, { x: 140, y: 20 },
    { x: 180, y: 80 }, { x: 200, y: 45 }, { x: 240, y: 35 },
    { x: 280, y: 65 }, { x: 320, y: 25 }, { x: 360, y: 55 }
  ]
  return (
    <svg className="w-full h-full" viewBox="0 0 400 100">
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="6"
          fill={i % 2 === 0 ? "var(--spidey-red)" : "var(--spidey-blue)"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        />
      ))}
    </svg>
  )
}
