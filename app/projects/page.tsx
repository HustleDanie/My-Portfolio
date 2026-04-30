"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Workflow, Cpu } from "lucide-react"
import Link from "next/link"
import { projectsByCategory as projectData, type Project as ProjectData } from "@/data/projects"
import { ProjectQuickView } from "@/components/project-quick-view"
import { useIsMobile } from "@/hooks/use-mobile"

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

const projectsByCategory = projectData

function ProjectsPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const validCategories = categories.map(c => c.id)
  const initialCategory = categoryParam && validCategories.includes(categoryParam) ? categoryParam : "workflow-automation"
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const isMobile = useIsMobile()

  const currentProjects = projectsByCategory[activeCategory] || []

  const openModalIfDesktop = (e: React.MouseEvent, project: ProjectData) => {
    if (!isMobile) {
      e.preventDefault()
      setSelectedProject(project)
    }
  }

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

          {/* Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6 md:mb-12"
          >
            <div className="relative inline-flex items-center bg-gray-200 dark:bg-gray-800 md:bg-gray-100 md:dark:bg-gray-900 rounded-full p-0.5 md:p-1 border border-gray-300 dark:border-gray-700 md:border-0 md:ring-1 md:ring-black/5 md:dark:ring-white/10">
              {/* Sliding indicator */}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-white dark:bg-card border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50">
                    {/* Project Image */}
                    <Link href={`/projects/${project.id}`} onClick={(e) => openModalIfDesktop(e, project)}>
                      <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 cursor-pointer">
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
                    </Link>

                    {/* Project Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <Link href={`/projects/${project.id}`} onClick={(e) => openModalIfDesktop(e, project)}>
                        <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors cursor-pointer">
                          {project.title}
                        </h3>
                      </Link>
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
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-space-mono rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">View on GitHub</span>
                          <span className="sm:hidden">GitHub</span>
                        </Link>
                        <Link
                          href={`/projects/${project.id}`}
                          onClick={(e) => openModalIfDesktop(e, project)}
                          className="flex items-center gap-1 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <span>Details</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectQuickView project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProjectsPageContent />
    </Suspense>
  )
}
