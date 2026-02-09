"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-6">
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
        </motion.div>
      </div>
    </footer>
  )
}
