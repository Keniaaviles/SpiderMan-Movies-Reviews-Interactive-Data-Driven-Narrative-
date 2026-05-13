"use client"

import { motion } from "framer-motion"
import { Star, ImageIcon } from "lucide-react"
import Image from "next/image"

interface MovieCardProps {
  title: string
  year: number
  rating: string
  reviewCount: string
  image?: string
  index: number
}

export function MovieCard({ 
  title, 
  year, 
  rating, 
  reviewCount,
  image,
  index 
}: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-spidey-red/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {/* Movie poster */}
      <div className="aspect-[2/3] bg-gradient-to-br from-spidey-dark to-spidey-darker relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`${title} poster`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Placeholder with spider icon */}
            <div className="relative">
              <ImageIcon className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <svg className="absolute -top-2 -right-2 w-6 h-6 text-spidey-red/50" viewBox="0 0 50 50">
                <ellipse cx="25" cy="30" rx="10" ry="12" fill="currentColor"/>
                <ellipse cx="25" cy="18" rx="6" ry="6" fill="currentColor"/>
                <path d="M15,25 Q5,18 8,8 M35,25 Q45,18 42,8 M12,32 Q2,38 5,48 M38,32 Q48,38 45,48" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <p className="text-xs text-muted-foreground/50 text-center uppercase tracking-wider">
              Poster coming soon
            </p>
            <div className="text-2xl font-black text-muted-foreground/20 mt-2">{year}</div>
          </div>
        )}
        
        {/* Year badge */}
        <div className="absolute top-3 right-3 bg-spidey-darker/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-foreground">{year}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 relative z-20">
        <h3 className="font-bold text-foreground text-lg leading-tight mb-3 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-spidey-red text-spidey-red" />
            <span className="font-semibold text-foreground">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">{reviewCount}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function MovieCardGrid({ movies }: { movies: MovieCardProps[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {movies.map((movie, i) => (
        <MovieCard key={i} {...movie} index={i} />
      ))}
    </div>
  )
}
