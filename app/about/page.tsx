"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Brain, Code, Database, Lightbulb, Microscope, Zap } from "lucide-react"

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    { name: "Machine Learning", icon: <Brain className="h-4 w-4 md:h-5 md:w-5" />, level: 95 },
    { name: "Deep Learning", icon: <Zap className="h-4 w-4 md:h-5 md:w-5" />, level: 90 },
    { name: "Reinforcement Learning", icon: <Lightbulb className="h-4 w-4 md:h-5 md:w-5" />, level: 85 },
    { name: "LLM Engineering", icon: <Code className="h-4 w-4 md:h-5 md:w-5" />, level: 92 },
    { name: "Data Science", icon: <Database className="h-4 w-4 md:h-5 md:w-5" />, level: 88 },
    { name: "Research Methods", icon: <Microscope className="h-4 w-4 md:h-5 md:w-5" />, level: 94 },
  ]


  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            About Me
          </h1>
          <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
        </motion.div>

        {/* Main Content - Portrait and Introduction */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-black rounded-lg overflow-hidden">
                <img
                  src="/images/uche-portrait.jpg"
                  alt="Uche Maduabuchi Daniel - AI Researcher & Engineer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
                <div className="absolute inset-0 glitch-overlay opacity-5 md:opacity-10"></div>
              </div>
              <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-black dark:border-white"></div>
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-black dark:border-white"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
              AI Researcher & Engineer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 md:mb-6 font-space-mono text-sm md:text-base">
              Hi, I'm Uche Maduabuchi Daniel, an AI Researcher & Engineer pursuing graduate studies at the University of
              Ibadan. I specialize in Natural Language Processing, Computer Vision, and Reinforcement Learning—areas
              transforming how we interact with technology.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 md:mb-8 text-sm md:text-base font-space-mono">
              I'm passionate about intelligent systems that solve real-world problems at scale. Beyond research, I enjoy
              video games, exploring new ideas, and experimenting with emerging technologies. Always eager to push
              boundaries and try something new.
            </p>

            {/* Skills Section */}
            <div className="space-y-3 md:space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-space-mono">
                      {skill.icon}
                      <span className="font-space-mono text-xs md:text-sm">{skill.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 h-1 md:h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-black dark:bg-white"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
