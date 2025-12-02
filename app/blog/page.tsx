"use client"

import { motion } from "framer-motion"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            Blog
          </h1>
          <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-space-mono leading-relaxed max-w-2xl mx-auto">
            Thoughts, insights, and technical deep dives into the world of artificial intelligence research.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
