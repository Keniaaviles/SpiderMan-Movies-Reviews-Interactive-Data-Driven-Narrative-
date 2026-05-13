"use client"

import { motion } from "framer-motion"
import { Play, ExternalLink } from "lucide-react"

export function TrailerSection() {
  // YouTube video ID from the provided link
  const youtubeVideoId = "8TZMtslA3UY"
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-spidey-darker via-spidey-red/5 to-spidey-darker" />
      
      {/* Web decoration */}
      <svg className="absolute top-0 right-0 w-96 h-96 opacity-10" viewBox="0 0 200 200">
        <path d="M200,0 L100,100 M200,50 L125,100 M200,100 L100,100 M150,0 L100,75" stroke="currentColor" strokeWidth="1" className="text-spidey-red" fill="none"/>
        <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
      </svg>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            <span className="text-glow-red">The Next Swing</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The past movies are back in the conversation because fans are already looking toward what comes next.
          </p>
        </motion.div>

        {/* Video embed container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border-2 border-spidey-red/30 glow-red"
        >
          {/* YouTube embed with autoplay */}
          <div className="aspect-video relative">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=1&rel=0`}
              title="Spider-Man: Brand New Day Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Play icon overlay (for when video is loading) */}
          <div className="absolute inset-0 flex items-center justify-center bg-spidey-darker/50 pointer-events-none opacity-0 transition-opacity">
            <div className="w-20 h-20 rounded-full bg-spidey-red/80 flex items-center justify-center">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Watch on YouTube button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <motion.a
            href={`https://youtu.be/${youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-spidey-red text-white font-bold rounded-full glow-red hover:bg-spidey-red-glow transition-colors"
          >
            <Play className="w-5 h-5 fill-white" />
            Watch on YouTube
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
