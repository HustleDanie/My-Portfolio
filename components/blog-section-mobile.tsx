"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function BlogSectionMobile() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog-mobile" ref={ref} className="py-12 md:hidden relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="font-orbitron text-2xl font-bold mb-3 text-black dark:text-white">Blogs</h2>
          <div className="w-16 h-1 bg-black dark:bg-white mx-auto mb-4"></div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="text-5xl mb-4">✍️</div>
          <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-3">
            Coming Soon
          </h3>
          <p className="font-space-mono text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
            Blog posts are on the way. Check back soon for articles and insights!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

