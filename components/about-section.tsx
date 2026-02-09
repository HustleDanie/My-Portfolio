"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

interface HighlightedTextProps {
  text: string
  keywords: string[]
  className?: string
}

function HighlightedText({ text, keywords, className }: HighlightedTextProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % keywords.length)
    }, 2500) // Change highlight every 2.5 seconds

    return () => clearInterval(interval)
  }, [keywords.length])

  const parts = text.split(new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi"))

  return (
    <p className={className}>
      {parts.map((part, index) => {
        const isKeyword = keywords.some(
          (keyword) => part.toLowerCase() === keyword.toLowerCase()
        )
        const isHighlighted = isKeyword && keywords[highlightedIndex]?.toLowerCase() === part.toLowerCase()

        if (isKeyword) {
          return (
            <motion.span
              key={index}
              animate={{
                backgroundColor: isHighlighted
                  ? [
                      "rgba(0, 0, 0, 0.15)",
                      "rgba(0, 0, 0, 0.25)",
                      "rgba(0, 0, 0, 0.15)",
                    ]
                  : "rgba(0, 0, 0, 0.05)",
                scale: isHighlighted ? [1, 1.02, 1] : 1,
              }}
              transition={{
                duration: 1.2,
                repeat: isHighlighted ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className={`inline-block px-1 rounded transition-colors ${
                isHighlighted
                  ? "font-semibold text-black dark:text-white"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {part}
            </motion.span>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </p>
  )
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-10 md:py-20 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -60, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 md:mb-12 text-center"
          >
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -80, filter: "blur(10px)" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-black rounded-lg overflow-hidden">
                <img
                  src="/images/uche-portrait.jpg"
                  alt="Uche Maduabuchi Daniel - AI Researcher & Engineer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

                {/* Glitch effect overlay - reduced on mobile */}
                <div className="absolute inset-0 glitch-overlay opacity-5 md:opacity-10"></div>
              </div>

              {/* Decorative elements - smaller on mobile */}
              <div className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 md:-top-4 md:-left-4 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-black dark:border-white"></div>
              <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 md:-bottom-4 md:-right-4 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-black dark:border-white"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 80, filter: "blur(10px)" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2"
          >
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4">AI Researcher & Engineer</h3>
            <HighlightedText
              text="Hi, I'm Uche Maduabuchi Daniel, an AI Researcher & Engineer pursuing graduate studies at the University of Ibadan. I specialize in Natural Language Processing, Computer Vision, and Reinforcement Learning—areas transforming how we interact with technology."
              keywords={[
                "AI Researcher & Engineer",
                "Natural Language Processing",
                "Computer Vision",
                "Reinforcement Learning",
                "transforming",
              ]}
              className="text-gray-700 dark:text-gray-300 mb-3 md:mb-6 font-space-mono text-xs sm:text-sm md:text-base text-left md:text-justify leading-relaxed"
            />
            <HighlightedText
              text="I'm passionate about intelligent systems that solve real-world problems at scale. Beyond research, I enjoy video games, exploring new ideas, and experimenting with emerging technologies. Always eager to push boundaries and try something new."
              keywords={[
                "intelligent systems",
                "real-world problems",
                "emerging technologies",
                "push boundaries",
              ]}
              className="text-gray-700 dark:text-gray-300 mb-4 md:mb-8 text-xs sm:text-sm md:text-base font-space-mono text-left md:text-justify leading-relaxed"
            />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
