"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
      </div>
    </section>
  )
}

export default ProjectsSection
