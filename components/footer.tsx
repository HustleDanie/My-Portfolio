"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
            Let's Connect
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-space-mono">
            Interested in collaborating on cutting-edge AI research or discussing the future of artificial intelligence?
            I'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 font-space-mono border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              asChild
            >
              <a href="mailto:contact@hustledanie.ai">
                <Mail className="h-5 w-5" />
                contact@hustledanie.ai
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 font-space-mono border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <Button variant="ghost" size="sm" className="p-2" asChild>
              <a
                href="https://github.com/hustledanie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>

            <Button variant="ghost" size="sm" className="p-2" asChild>
              <a
                href="https://linkedin.com/in/hustledanie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>

            <Button variant="ghost" size="sm" className="p-2" asChild>
              <a
                href="https://twitter.com/hustledanie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </Button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-space-mono">
              © 2025 HustleDanie.AI. All rights reserved. | Building the future of AI, one algorithm at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
