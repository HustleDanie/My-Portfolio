"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, Github, Twitter, Linkedin, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/typewriter-effect"
import Link from "next/link"

export function HeroSection() {
  const [fabOpen, setFabOpen] = useState(false)
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-4"
    >
      {/* Social Media Icons - Hidden on mobile, shown as bottom bar on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4"
      >
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

      {/* Mobile FAB Menu */}
      <div className="md:hidden fixed bottom-6 right-6 z-20">
        {/* FAB Menu Items */}
        <AnimatePresence>
          {fabOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                onClick={() => setFabOpen(false)}
              />
              
              {/* Menu Items */}
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0 }}
                className="absolute bottom-20 right-0 flex items-center gap-3"
              >
                <span className="px-3 py-1.5 bg-card rounded-lg text-sm font-medium text-foreground shadow-lg">
                  LinkedIn
                </span>
                <div className="p-3 bg-[#0077B5] rounded-full shadow-lg">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
              </motion.a>

              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.05 }}
                className="absolute bottom-36 right-0 flex items-center gap-3"
              >
                <span className="px-3 py-1.5 bg-card rounded-lg text-sm font-medium text-foreground shadow-lg">
                  Twitter
                </span>
                <div className="p-3 bg-[#1DA1F2] rounded-full shadow-lg">
                  <Twitter className="h-5 w-5 text-white" />
                </div>
              </motion.a>

              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-52 right-0 flex items-center gap-3"
              >
                <span className="px-3 py-1.5 bg-card rounded-lg text-sm font-medium text-foreground shadow-lg">
                  GitHub
                </span>
                <div className="p-3 bg-[#333] dark:bg-[#6e5494] rounded-full shadow-lg">
                  <Github className="h-5 w-5 text-white" />
                </div>
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          onClick={() => setFabOpen(!fabOpen)}
          className="p-4 bg-primary rounded-full shadow-lg hover:shadow-xl transition-shadow"
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: fabOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {fabOpen ? (
            <X className="h-6 w-6 text-primary-foreground" />
          ) : (
            <Plus className="h-6 w-6 text-primary-foreground" />
          )}
        </motion.button>
      </div>

      <div className="container mx-auto z-10 text-center max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 md:mb-6"
        >
          <h2 className="font-space-mono text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-600 dark:text-gray-400 mb-2">
            AI Researcher & Engineer
          </h2>
        </motion.div>

        <div className="mb-4 md:mb-8">
          <TypewriterEffect
            words={words}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold tracking-tight"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-xl mb-6 md:mb-10 font-space-mono leading-relaxed px-2"
        >
          Exploring the convergence of Large Language Models, Reinforcement Learning, and Cognitive Architectures to
          build the next generation of AI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center mb-24 md:mb-0 px-4"
        >
          <a href="#contact" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="font-space-mono bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 w-full text-sm sm:text-base h-12 sm:h-11"
            >
              Get in Touch
            </Button>
          </a>
          <Link href="/projects" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="font-space-mono border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black w-full text-sm sm:text-base h-12 sm:h-11"
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
