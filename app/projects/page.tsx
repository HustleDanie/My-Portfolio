"use client"

import { motion } from "framer-motion"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              Projects
            </h1>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Coming Soon
            </h3>
            <p className="font-space-mono text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-md">
              Exciting projects are in the works. Stay tuned for updates!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
