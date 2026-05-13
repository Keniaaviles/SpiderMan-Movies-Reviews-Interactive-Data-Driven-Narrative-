"use client"

import { HeroSection } from "@/components/hero-section"
import { NYCBanner } from "@/components/nyc-banner"
import { StickySection } from "@/components/sticky-section"
import { FlourishEmbed } from "@/components/flourish-embed"
import { TextReveal, FadeInText } from "@/components/text-reveal"
import { FullscreenSection, TransitionSection, StatsSection } from "@/components/fullscreen-section"
import { ScrollProgress, SectionIndicator } from "@/components/scroll-progress"
import { MovieCardGrid } from "@/components/movie-card"
import { WebBackground } from "@/components/web-background"
import { ComicPanelSection } from "@/components/comic-panel"
import { TrailerSection } from "@/components/trailer-section"
import { FanMemoryWeb } from "@/components/visualizations/fan-memory-web"
import { SpiderSenseTimeline } from "@/components/visualizations/spider-sense-timeline"
import { MultiverseDistortionRings } from "@/components/visualizations/multiverse-distortion"
import { QuotesFansKeptAlive } from "@/components/visualizations/quotes-fans-kept"
import { CitySkyline } from "@/components/visualizations/city-skyline"
import { SpiderSenseScoreboard } from "@/components/visualizations/spider-sense-scoreboard"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const sections = [
  { id: "hero", label: "Introduction" },
  { id: "volume", label: "Volume of Voices" },
  { id: "memory", label: "Fan Memory Web" },
  { id: "timeline", label: "Timeline" },
  { id: "distortion", label: "Multiverse" },
  { id: "quotes", label: "Fan Quotes" },
  { id: "skyline", label: "City Skyline" },
  { id: "scoreboard", label: "Scoreboard" },
  { id: "conclusion", label: "Conclusion" },
]

// Movie data with actual values and poster images
const spiderManMovies = [
  { title: "Spider-Man", year: 2002, rating: "6.3 avg", reviewCount: "2,345 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spiderman%202002%20-IEGgIAVx6PjXIE4nheXMu2YiGFVPKG.jpeg", index: 0 },
  { title: "Spider-Man 2", year: 2004, rating: "6.6 avg", reviewCount: "1,644 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spiderman%202004%20-vftIrajm0lOKC1vepWiXmG5QiCnu8F.jpeg", index: 1 },
  { title: "Spider-Man 3", year: 2007, rating: "5.7 avg", reviewCount: "2,257 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spider-Man%203%202007-obDuoiR9ZJyAv7SSceqGJQxPQ0ENZb.jpeg", index: 2 },
  { title: "The Amazing Spider-Man", year: 2012, rating: "6.4 avg", reviewCount: "1,524 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Amazing%20Spider-Man%202012-rfT9V1Q6aYutPg3CaFk5kh2CI0T5Qv.jpeg", index: 3 },
  { title: "The Amazing Spider-Man 2", year: 2014, rating: "5.9 avg", reviewCount: "1,347 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Amazing%20Spider-Man%202%202014-Iic2LrTZEz2Xsm3MRHDe0fbqA3D5S4.jpeg", index: 4 },
  { title: "Spider-Man: Homecoming", year: 2017, rating: "6.3 avg", reviewCount: "1,567 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spider-Man-%20Homecoming%202017-6MJs5y1Ktca8CxJN0LHPOVPURBHNca.jpg", index: 5 },
  { title: "Spider-Man: Far From Home", year: 2019, rating: "6.9 avg", reviewCount: "2,333 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spider-Man-%20Far%20From%20Home-ka2rxaJ4nauSUY8fyDnKoOe7PBPeIr.jpeg", index: 6 },
  { title: "Spider-Man: No Way Home", year: 2021, rating: "8.2 avg", reviewCount: "6,065 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spider-Man-%20No%20Way%20Home%202021-0eDTIxAc4Bx14AgcgUsNYZR2BFPuwy.jpeg", index: 7 },
  { title: "Spider-Man: Into the Spider-Verse", year: 2018, rating: "8.5 avg", reviewCount: "2,146 reviews", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spider-Man-%20No%20Way%20Home%202021-0eDTIxAc4Bx14AgcgUsNYZR2BFPuwy.jpeg", index: 8 },
]

export default function SpiderManScrollytelling() {
  return (
    <main className="relative bg-spidey-darker">
      <WebBackground />
      <ScrollProgress />
      <SectionIndicator sections={sections} />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* NYC Banner Section */}
      <NYCBanner />

      {/* Movies Overview / Timeline */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 web-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <FadeInText>
            <h2 className="text-3xl md:text-5xl font-black text-center text-foreground mb-4">
              The Spider-Verse Timeline
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Nine films across three eras of Spider-Man movies.
            </p>
          </FadeInText>
          <MovieCardGrid movies={spiderManMovies} />
        </div>
      </section>



      {/* Section 1: The Volume of Voices - Flourish Pie Chart */}
      <div id="volume">
        <StickySection
          title="The Volume of Voices"
          subtitle="Every movie has fans, but some movies pulled way more people into the conversation. This chart shows which Spider-Man films took up the biggest share of IMDb reviews in this dataset."
          index={1}
          accentColor="red"
        >
          <FlourishEmbed visualizationId="28930233" />
        </StickySection>
      </div>

      {/* Stats Break - By the Numbers */}
      <StatsSection 
        title="By the Numbers"
        stats={[
          { value: "21K+", label: "Total Reviews" },
          { value: "20", label: "Years of Data" },
          { value: "9", label: "Films Analyzed" },
          { value: "8.5", label: "Peak Rating" },
        ]}
      />

      {/* Section 2: The Fan Memory Web */}
      <div id="memory">
        <StickySection
          title="The Fan Memory Web"
          subtitle="Reviews are not just numbers. They are little pieces of what fans remember. This web pulls out the words that show up again and again across the Spider-Man reviews."
          index={2}
          accentColor="blue"
        >
          <FanMemoryWeb />
        </StickySection>
      </div>

      {/* Transition Quote */}
      <TransitionSection 
        quote="Anyone can wear the mask"
        author="Miles Morales"
        accentColor="blue"
      />

      {/* Section 3: Spider-Sense Timeline */}
      <div id="timeline">
        <StickySection
          title="When the Fandom Got Loud"
          subtitle="Some moments made fans run to the keyboard. This timeline shows when the review activity picked up and which movies pulled fans back into the conversation."
          index={3}
          accentColor="red"
        >
          <SpiderSenseTimeline />
        </StickySection>
      </div>

      {/* Section 4: Multiverse Distortion Rings */}
      <div id="distortion">
        <StickySection
          title="The Multiverse Distortion"
          subtitle="Some Spider-Man movies follow the pattern. Others bend it. These portals show which films stand out most when rating, review volume and helpful votes are compared to the dataset average."
          index={4}
          accentColor="blue"
        >
          <MultiverseDistortionRings />
        </StickySection>
      </div>

      {/* Section 5: Quotes Fans Kept Alive */}
      <div id="quotes">
        <StickySection
          title="The Quotes Fans Kept Alive"
          subtitle="Some reviews get buried. Others become the kind of take fans agree with, argue with or remember years later. These are the reviews that other IMDb users marked as helpful."
          index={5}
          accentColor="red"
        >
          <QuotesFansKeptAlive />
        </StickySection>
      </div>

      {/* Moments Fans Still Talk About */}
      <FullscreenSection background="gradient-blue">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInText>
            <h2 className="text-3xl md:text-5xl font-black text-center text-foreground mb-16 text-glow-blue">
              Moments Fans Still Talk About
            </h2>
          </FadeInText>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Doc Ock Returns",
                film: "No Way Home",
                description: "The comeback that made the multiverse feel personal."
              },
              { 
                title: "Andrew Saves MJ",
                film: "No Way Home", 
                description: "A moment fans connected to grief, second chances and unfinished stories."
              },
              { 
                title: "The Train Scene",
                film: "Spider-Man 2",
                description: "Still one of the clearest examples of why Spider-Man feels tied to ordinary people."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-card/30 border border-spidey-blue/30 rounded-2xl p-6 text-center hover:border-spidey-blue/60 transition-colors"
              >
                <div className="mb-4 flex justify-center">
                  <svg className="w-8 h-8 text-spidey-blue" viewBox="0 0 50 50">
                    <ellipse cx="25" cy="30" rx="10" ry="12" fill="currentColor"/>
                    <ellipse cx="25" cy="18" rx="6" ry="6" fill="currentColor"/>
                    <path d="M15,25 Q5,18 8,8 M35,25 Q45,18 42,8 M12,32 Q2,38 5,48 M38,32 Q48,38 45,48" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-spidey-blue mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.film}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FullscreenSection>

      {/* Section 6: City Skyline of Fan Impact */}
      <div id="skyline">
        <StickySection
          title="The City of Fan Reactions"
          subtitle="Spider-Man belongs to the city, so this chart turns the movies into a skyline. Taller buildings show the movies that brought in more reviews. Brighter windows show the ones with reviews fans found more helpful."
          index={6}
          accentColor="blue"
        >
          <CitySkyline />
        </StickySection>
      </div>

      {/* Section 7: Spider-Sense Scoreboard */}
      <div id="scoreboard">
        <StickySection
          title="The Spider-Sense Scoreboard"
          subtitle="This is my project's fan impact score. It combines how many people reviewed the movie, how highly they rated it and how helpful other fans found those reviews."
          index={7}
          accentColor="red"
        >
          <SpiderSenseScoreboard />
        </StickySection>
      </div>

      {/* What Fans Keep Bringing Up - Key Findings */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-spidey-darker via-spidey-red/5 to-spidey-darker" />
        
        <svg className="absolute top-10 left-10 w-32 h-32 opacity-10" viewBox="0 0 200 200">
          <path d="M100,0 L100,200 M0,100 L200,100 M0,0 L200,200 M200,0 L0,200" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" className="text-spidey-red" fill="none"/>
        </svg>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <FadeInText>
            <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-16">
              What Fans Keep Bringing Up
            </h2>
          </FadeInText>
          
          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Nostalgia keeps pulling fans back",
                content: "The older movies are not just old versions. They are the reason the newer ones hit harder."
              },
              {
                number: "02",
                title: "Big villains leave the biggest shadows",
                content: "Fans remember the villains who changed the emotional weight of the movie, not just the fight scenes."
              },
              {
                number: "03", 
                title: "The emotional scenes travel the farthest",
                content: "The reviews that stand out usually talk about sacrifice, grief, redemption or growing up."
              },
              {
                number: "04",
                title: "No Way Home became the reunion point",
                content: "It gave three eras of fans one movie to argue about, celebrate and rewatch together."
              },
            ].map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start group"
              >
                <span className="text-5xl font-black text-spidey-red/30 group-hover:text-spidey-red/60 transition-colors">{insight.number}</span>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{insight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{insight.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comic Panel Section */}
      <ComicPanelSection />

      {/* Trailer Section */}
      <TrailerSection />

      {/* Final Question */}
      <FullscreenSection background="dark">
        <div className="flex items-center justify-center min-h-[50vh] px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl leading-tight"
          >
            Will the next movie be better than all of the previous ones?
          </motion.h2>
        </div>
      </FullscreenSection>

      {/* Conclusion */}
      <div id="conclusion">
        <FullscreenSection background="darker">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-64 h-80 mx-auto mb-12 rounded-2xl overflow-hidden border-2 border-spidey-red/30"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Poster-sWAhtHNJorpMuYy9evW7RHpBMWJ1aF.jpg"
                alt="Spider-Man magazine cover"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-spidey-darker/60 to-transparent" />
            </motion.div>

            <FadeInText>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 text-glow-red">
                The Story Continues
              </h2>
            </FadeInText>
            
            <FadeInText delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                That is why this project looks backward before looking forward.
              </p>
              <p className="text-lg text-muted-foreground/80 mb-12">
                Spider-Man: Brand New Day swings into theaters July 31, 2026.
              </p>
            </FadeInText>
            
            <FadeInText delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://www.marvel.com/movies/spider-man-brand-new-day"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-spidey-red text-white font-bold rounded-full glow-red"
                >
                  Read Marvel&apos;s update on Brand New Day
                  <ExternalLink className="w-4 h-4" />
                </motion.a>

              </div>
            </FadeInText>
          </div>
        </FullscreenSection>
      </div>

      {/* Footer */}
      <footer className="py-16 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-foreground mb-2">
                <span className="text-spidey-red">SPIDER</span>
                <span className="text-spidey-blue">-DATA</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Created by Kenia Aviles Quintero
              </p>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-spidey-red transition-colors">About</a>
              <a href="#" className="hover:text-spidey-red transition-colors">Data Sources</a>
              <a 
                href="https://www.marvel.com/movies/spider-man-brand-new-day" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-spidey-red transition-colors flex items-center gap-1"
              >
                Brand New Day
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
            <p>Data visualization powered by Flourish</p>
            <p className="mt-2">Spider-Man and related characters are trademarks of Marvel Entertainment</p>
            <p className="mt-4 text-muted-foreground/60">Built with data from IMDb reviews</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
