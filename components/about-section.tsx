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
                      "rgba(99, 102, 241, 0.2)",
                      "rgba(99, 102, 241, 0.35)",
                      "rgba(99, 102, 241, 0.2)",
                    ]
                  : "rgba(99, 102, 241, 0.1)",
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
                  ? "font-semibold text-indigo-700 dark:text-indigo-300"
                  : "text-indigo-600 dark:text-indigo-400"
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
            className="order-1 lg:order-1"
          >
            <div className="relative max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-black rounded-lg overflow-hidden">
                <img
                  src="/images/uche-portrait.jpg"
                  alt="Uche Maduabuchi Daniel - AI Applications Engineer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

                {/* Glitch effect overlay - reduced on mobile */}
                <div className="absolute inset-0 glitch-overlay opacity-5 md:opacity-10"></div>
              </div>

              {/* Decorative elements - smaller on mobile */}
              <div className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 md:-top-4 md:-left-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-black dark:border-white"></div>
              <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 md:-bottom-4 md:-right-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-black dark:border-white"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 80, filter: "blur(10px)" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-2"
          >
            <h3 className="font-orbitron text-xl sm:text-xl md:text-2xl font-bold mb-3 md:mb-4">AI Applications Engineer</h3>
            <HighlightedText
              text="Hi, I'm Uche Maduabuchi Daniel, an AI Applications Engineer with a degree from the University of Ibadan. I specialize in building AI-powered mobile apps, web applications, and agentic AI systems that deliver real-world value."
              keywords={[
                "AI Applications Engineer",
                "AI-powered mobile apps",
                "web applications",
                "agentic AI systems",
                "real-world value",
              ]}
              className="text-gray-700 dark:text-gray-300 mb-3 md:mb-6 font-space-mono text-sm sm:text-sm md:text-base text-left leading-loose sm:leading-relaxed"
            />
            <HighlightedText
              text="I'm passionate about turning AI capabilities into production-ready products that users love. Beyond building, I enjoy video games, exploring new ideas, and experimenting with emerging technologies. Always eager to push boundaries and ship something new."
              keywords={[
                "production-ready products",
                "emerging technologies",
                "push boundaries",
                "ship something new",
              ]}
              className="text-gray-700 dark:text-gray-300 mb-4 md:mb-8 text-sm sm:text-sm md:text-base font-space-mono text-left leading-loose sm:leading-relaxed"
            />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
