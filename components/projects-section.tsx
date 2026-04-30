"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, Workflow, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projectsByCategory, type Project } from "@/data/projects"
import { ProjectQuickView } from "@/components/project-quick-view"

function TechIcon({ name, logo, className }: { name: string; logo: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-[8px] sm:text-[10px] font-bold text-gray-600 dark:text-gray-300 font-space-mono ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      className={`opacity-70 hover:opacity-100 transition-opacity ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

const categories = [
  { id: "workflow-automation", label: "Workflow Automation", mobileLabel: "Automation", icon: Workflow },
  { id: "ai-ml", label: "AI / ML", mobileLabel: "AI / ML", icon: Cpu },
]

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("workflow-automation")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const currentProjects = projectsByCategory[activeCategory] || []

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
        </motion.div>

        {/* Category Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-6 md:mb-12"
        >
          <div className="relative inline-flex items-center bg-gray-200 dark:bg-gray-800 md:bg-gray-100 md:dark:bg-gray-900 rounded-full p-0.5 md:p-1 border border-gray-300 dark:border-gray-700 md:border-0 md:ring-1 md:ring-black/5 md:dark:ring-white/10">
            <motion.div
              className="absolute top-0.5 md:top-1 bottom-0.5 md:bottom-1 rounded-full bg-gray-500 dark:bg-gray-600 md:bg-white md:dark:bg-gray-800 md:shadow-sm md:ring-1 md:ring-black/5"
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                width: `calc(${100 / categories.length}% - 4px)`,
                left: `calc(${(categories.findIndex(c => c.id === activeCategory) * 100) / categories.length}% + 2px)`,
              }}
            />
            {categories.map((category) => {
              const count = projectsByCategory[category.id]?.length ?? 0
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative z-10 px-3 md:px-5 py-1.5 rounded-full font-space-mono text-[10px] md:text-sm font-medium transition-colors duration-200 min-w-[100px] md:min-w-[150px] md:tracking-tight ${
                    activeCategory === category.id
                      ? "text-white md:text-black md:dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="hidden md:inline-flex items-center justify-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{category.label}</span>
                    <span className="opacity-50">· {count}</span>
                  </span>
                  <span className="md:hidden">{category.mobileLabel}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-16"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="block w-full text-left h-full bg-white dark:bg-card border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50 rounded-xl md:rounded-none shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.08)] md:shadow-none cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <img
                      src={project.image || "/placeholder-logo.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-logo.svg"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-space-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Icons */}
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      {project.techStack.map((tech) => (
                        <div
                          key={tech.name}
                          className="relative group/tech"
                        >
                          <TechIcon
                            name={tech.name}
                            logo={tech.logo}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-space-mono rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* GitHub Link */}
                    <div className="flex items-center pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg group text-sm sm:text-base h-12 sm:h-11"
          >
            <Link href={`/projects?category=${activeCategory}`} className="flex items-center gap-2">
              Explore More Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <ProjectQuickView project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

export default ProjectsSection
