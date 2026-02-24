"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog" ref={ref} className="py-20 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">Blog</h2>
          <div className="w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="text-6xl mb-6">✍️</div>
          <h3 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Coming Soon
          </h3>
          <p className="font-space-mono text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-md">
            Blog posts are on the way. Check back soon for articles and insights!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
