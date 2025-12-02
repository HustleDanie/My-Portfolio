"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const blogPosts = [
  {
    id: "1",
    title: "Understanding Transformer Architecture",
    subtitle: "Deep dive into the transformer architecture and its applications in modern AI systems.",
    cta: "READ MORE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "dark",
    link: "#",
  },
  {
    id: "2",
    title: "Reinforcement Learning Fundamentals",
    subtitle: "Exploring the core concepts and algorithms behind reinforcement learning.",
    cta: "EXPLORE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "medium",
    link: "#",
  },
  {
    id: "3",
    title: "Computer Vision with CNNs",
    subtitle: "A comprehensive guide to convolutional neural networks for image processing.",
    cta: "LEARN MORE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "dark",
    link: "#",
  },
  {
    id: "4",
    title: "Large Language Models Explained",
    subtitle: "Understanding how LLMs work, their capabilities, and their impact on AI research.",
    cta: "DISCOVER →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "light",
    link: "#",
  },
  {
    id: "5",
    title: "Neural Network Optimization",
    subtitle: "Advanced techniques for training faster and more efficient deep learning models.",
    cta: "VIEW ARTICLE →",
    image: "/placeholder.svg?height=600&width=400",
    overlay: "medium",
    link: "#",
  },
]

export function ResearchSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="research" ref={ref} className="py-20 relative bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Blogs
            </h2>
            <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-black dark:text-gray-300">
              Thoughts, insights, and technical deep dives into the world of artificial intelligence research.
            </p>
          </motion.div>

          {/* Horizontal Collage Layout */}
          <div className="flex gap-2 h-[600px] overflow-x-auto overflow-y-hidden scrollbar-hide mb-12">
            {blogPosts.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex-shrink-0 group cursor-pointer transition-all duration-500 ease-in-out ${
                  hoveredIndex === index ? "w-[500px] md:w-[600px]" : "w-[200px] md:w-[250px]"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={blog.link} className="block w-full h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url(${blog.image})`,
                        transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {/* Overlay based on blog overlay type */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          blog.overlay === "dark"
                            ? "bg-black/70"
                            : blog.overlay === "medium"
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
                          {blog.title}
                        </h3>
                        <p className="text-xs md:text-sm lg:text-base text-gray-200 mb-4 line-clamp-2">
                          {blog.subtitle}
                        </p>
                        <div
                          className={`flex items-center text-xs md:text-sm font-space-mono transition-opacity duration-300 ${
                            hoveredIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <span>{blog.cta}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Explore More Blogs Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-8 py-3 rounded-lg group"
            >
              <Link href="/blog" className="flex items-center gap-2">
                Explore More Blogs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
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
