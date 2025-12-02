"use client"
import { motion } from "framer-motion"
import { ArrowDown, Github, Twitter, Linkedin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/typewriter-effect"
import Link from "next/link"

export function HeroSection() {
  const words = [
    { text: "Advancing" },
    { text: "the" },
    { text: "Frontiers" },
    { text: "of" },
    { text: "Artificial", className: "text-black dark:text-white" },
    { text: "Intelligence", className: "text-black dark:text-white" },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black px-4"
    >
      {/* Social Media Icons - Hidden on mobile, shown as bottom bar on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4"
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 group"
          title="Download Resume"
        >
          <FileText className="h-5 w-5 text-black dark:text-white group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 group"
        >
          <Github className="h-5 w-5 text-black dark:text-white group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 group"
        >
          <Twitter className="h-5 w-5 text-black dark:text-white group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 group"
        >
          <Linkedin className="h-5 w-5 text-black dark:text-white group-hover:scale-110 transition-transform" />
        </a>
      </motion.div>

      {/* Mobile Social Icons - Centered at bottom of screen */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full p-2"
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
          title="Download Resume"
        >
          <FileText className="h-4 w-4 text-black dark:text-white" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
        >
          <Github className="h-4 w-4 text-black dark:text-white" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
        >
          <Twitter className="h-4 w-4 text-black dark:text-white" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
        >
          <Linkedin className="h-4 w-4 text-black dark:text-white" />
        </a>
      </motion.div>

      <div className="container mx-auto z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 md:mb-6"
        >
          <h2 className="font-space-mono text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-600 dark:text-gray-400 mb-2">
            AI Researcher & Engineer
          </h2>
        </motion.div>

        <div className="mb-6 md:mb-8">
          <TypewriterEffect
            words={words}
            className="text-2xl md:text-5xl lg:text-6xl font-orbitron font-bold tracking-tight"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-base md:text-xl mb-8 md:mb-10 font-space-mono leading-relaxed"
        >
          Exploring the convergence of Large Language Models, Reinforcement Learning, and Cognitive Architectures to
          build the next generation of AI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center mb-20 md:mb-0"
        >
          <Link href="/research">
            <Button
              size="lg"
              className="font-space-mono bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 w-full md:w-auto"
            >
              View Research
            </Button>
          </Link>
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="font-space-mono border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black w-full md:w-auto"
            >
              Explore Projects
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute bottom-20 md:bottom-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  )
}
