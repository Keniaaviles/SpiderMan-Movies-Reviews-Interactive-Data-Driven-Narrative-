"use client"

import { motion } from "framer-motion"

export function ComicPanelSection() {
  const panels = [
    {
      number: "01",
      text: "The movie drops.",
      color: "red"
    },
    {
      number: "02", 
      text: "Fans review it.",
      color: "blue"
    },
    {
      number: "03",
      text: "Years later, the debates are still alive.",
      color: "red"
    }
  ]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Halftone pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '8px 8px'
          }}
        />
      </div>

      {/* Comic burst effects */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="text-spidey-red">
          <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="currentColor"/>
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="text-spidey-blue">
          <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="currentColor"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-center text-foreground mb-16"
          style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}
        >
          <span className="text-spidey-red">THE</span>{" "}
          <span className="text-foreground">COMIC PANEL</span>{" "}
          <span className="text-spidey-blue">BREAK</span>
        </motion.h2>

        {/* Comic panels grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {panels.map((panel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative"
            >
              {/* Panel container with comic border */}
              <div 
                className={`
                  relative bg-gradient-to-br 
                  ${panel.color === 'red' ? 'from-spidey-dark to-spidey-darker' : 'from-spidey-darker to-spidey-dark'}
                  border-4 border-foreground rounded-lg overflow-hidden
                  aspect-[3/4] md:aspect-square
                `}
                style={{
                  boxShadow: panel.color === 'red' 
                    ? '8px 8px 0 var(--spidey-red)' 
                    : '8px 8px 0 var(--spidey-blue)'
                }}
              >
                {/* Halftone overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${panel.color === 'red' ? 'var(--spidey-red)' : 'var(--spidey-blue)'} 1px, transparent 1px)`,
                    backgroundSize: '6px 6px'
                  }}
                />

                {/* Panel number */}
                <div 
                  className={`
                    absolute top-4 left-4 w-12 h-12 rounded-full 
                    flex items-center justify-center font-black text-lg
                    ${panel.color === 'red' ? 'bg-spidey-red' : 'bg-spidey-blue'} text-white
                  `}
                >
                  {panel.number}
                </div>

                {/* Spider silhouette decoration */}
                <div className="absolute bottom-4 right-4 opacity-20">
                  <svg width="40" height="40" viewBox="0 0 50 50" className={panel.color === 'red' ? 'text-spidey-red' : 'text-spidey-blue'}>
                    <ellipse cx="25" cy="30" rx="12" ry="15" fill="currentColor"/>
                    <ellipse cx="25" cy="15" rx="8" ry="8" fill="currentColor"/>
                    <path d="M13,25 Q0,15 5,5 M37,25 Q50,15 45,5 M10,35 Q-5,40 0,50 M40,35 Q55,40 50,50" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>

                {/* Speech bubble style text container */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div 
                    className="relative bg-foreground text-spidey-darker p-6 rounded-lg max-w-[80%]"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 60% 85%, 50% 100%, 40% 85%, 0% 85%)'
                    }}
                  >
                    <p 
                      className="text-lg md:text-xl font-black text-center uppercase"
                      style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                      {panel.text}
                    </p>
                  </div>
                </div>

                {/* Comic action lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="30" y2="30" stroke="currentColor" strokeWidth="0.5"/>
                  <line x1="100" y1="0" x2="70" y2="30" stroke="currentColor" strokeWidth="0.5"/>
                  <line x1="0" y1="100" x2="30" y2="70" stroke="currentColor" strokeWidth="0.5"/>
                  <line x1="100" y1="100" x2="70" y2="70" stroke="currentColor" strokeWidth="0.5"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
