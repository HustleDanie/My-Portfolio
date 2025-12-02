"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample blog posts for the collage
const blogPosts = [
  {
    id: "1",
    title: "Career Highlights",
    subtitle: "Cristiano Ronaldo's highlights and achievements.",
    cta: "VIEW HIGHLIGHTS →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "dark",
  },
  {
    id: "2",
    title: "Hydration & Wellness",
    subtitle: "The importance of proper hydration in peak performance.",
    cta: "READ MORE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "light",
  },
  {
    id: "3",
    title: "Fitness Training",
    subtitle: "Advanced workout routines and strength training techniques.",
    cta: "EXPLORE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "dark",
  },
  {
    id: "4",
    title: "Energy & Performance",
    subtitle: "Optimizing energy levels for maximum athletic output.",
    cta: "LEARN MORE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "medium",
  },
  {
    id: "5",
    title: "Lifestyle & Style",
    subtitle: "Balancing professional excellence with personal style.",
    cta: "DISCOVER →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "light",
  },
  {
    id: "6",
    title: "Legacy & Impact",
    subtitle: "Building a lasting legacy through dedication and excellence.",
    cta: "VIEW STORY →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "dark",
  },
]

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="blog" ref={ref} className="py-20 relative bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">Blog</h2>
          <div className="w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-black dark:text-gray-300">
            Thoughts, insights, and technical deep dives into the world of artificial intelligence research.
          </p>
        </motion.div>

        {/* Horizontal Collage Layout */}
        <div className="flex gap-2 h-[600px] overflow-x-auto overflow-y-hidden scrollbar-hide">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex-shrink-0 group cursor-pointer transition-all duration-500 ease-in-out ${
                hoveredIndex === index ? "w-[500px] md:w-[600px]" : "w-[200px] md:w-[250px]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-sm">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {/* Overlay based on post overlay type */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      post.overlay === "dark"
                        ? "bg-black/70"
                        : post.overlay === "medium"
                          ? "bg-black/50"
                          : "bg-black/40"
                    } ${hoveredIndex === index ? "opacity-60" : "opacity-80"}`}
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.9,
                      y: hoveredIndex === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-white"
                  >
                    <h3 className="font-orbitron text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-gray-200 mb-4 line-clamp-2">
                      {post.subtitle}
                    </p>
                    <div
                      className={`flex items-center text-xs md:text-sm font-space-mono transition-opacity duration-300 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span>{post.cta}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-space-mono hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
