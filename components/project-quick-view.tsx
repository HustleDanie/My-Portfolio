"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { X, Github, ExternalLink } from "lucide-react"
import type { Project } from "@/data/projects"

function TechIcon({ name, logo, className }: { name: string; logo: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-[10px] font-bold text-gray-600 dark:text-gray-300 font-space-mono ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      className={`opacity-80 ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

type Props = {
  project: Project | null
  onClose: () => void
}

export function ProjectQuickView({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-xl shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 bg-black/30 hover:bg-black/60 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-white" />
            </button>

            <div className="overflow-y-auto flex-1">
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src={project.image || "/placeholder-logo.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-logo.svg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-12">
                  <span className="inline-block mb-2 px-2.5 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-space-mono uppercase tracking-wider text-black dark:text-white">
                    {project.category === "workflow-automation" ? "Workflow Automation" : "AI / ML"}
                  </span>
                  <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-7 space-y-5 sm:space-y-6">
                <section>
                  <h4 className="font-orbitron text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 uppercase tracking-wider">
                    What was built
                  </h4>
                  <p className="font-space-mono text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.summary}
                  </p>
                </section>

                <section>
                  <h4 className="font-orbitron text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 uppercase tracking-wider">
                    Highlights
                  </h4>
                  <ul className="space-y-2 font-space-mono text-sm text-gray-700 dark:text-gray-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/60 flex-shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="font-orbitron text-xs sm:text-sm font-semibold text-black dark:text-white mb-3 uppercase tracking-wider">
                    Tech stack
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    {project.techStack.map((tech) => (
                      <div key={tech.name} className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        <TechIcon name={tech.name} logo={tech.logo} className="w-4 h-4" />
                        <span className="font-space-mono text-xs text-gray-700 dark:text-gray-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {project.github && project.github !== "#" && (
                  <section className="pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black font-space-mono text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      View on GitHub
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
