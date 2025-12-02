"use client"

import { motion } from "framer-motion"
import { Clock, BookOpen, ArrowRight, Star, Zap, Target } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: string
  duration: string
  image: string
  technologies: string[]
  objectives: string[]
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
      case "intermediate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      case "advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800"
      case "expert":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return <Target className="h-3 w-3" />
      case "intermediate":
        return <Zap className="h-3 w-3" />
      case "advanced":
        return <Star className="h-3 w-3" />
      case "expert":
        return <Star className="h-3 w-3 fill-current" />
      default:
        return <Target className="h-3 w-3" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group h-full"
    >
      <Card className="h-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 flex flex-col overflow-hidden group-hover:scale-[1.02] transform-gpu">
        {/* Enhanced Project Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800" />
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />

          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge
              className={`${getDifficultyColor(project.difficulty)} font-space-mono text-xs px-3 py-1 border backdrop-blur-sm`}
            >
              <span className="flex items-center gap-1">
                {getDifficultyIcon(project.difficulty)}
                {project.difficulty}
              </span>
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Badge className="bg-black/80 text-white dark:bg-white/80 dark:text-black font-space-mono text-xs px-3 py-1 backdrop-blur-sm border border-white/20">
              {project.category}
            </Badge>
          </div>

          {/* Hover Overlay with Quick Stats */}
          <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="text-center text-white space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-space-mono">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-space-mono">{project.objectives.length} goals</span>
                </div>
              </div>
              <div className="text-xs font-space-mono text-gray-300">{project.technologies.length} technologies</div>
            </div>
          </div>
        </div>

        <CardHeader className="pb-4 space-y-3">
          <h3 className="font-orbitron text-lg font-bold text-black dark:text-white leading-tight line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Enhanced Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-space-mono">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{project.objectives.length} objectives</span>
            </div>
            <div className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded-full">
              {project.technologies.length} techs
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>

          {/* Enhanced Technologies Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-space-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs font-space-mono bg-gray-50/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs font-space-mono bg-gray-50/80 dark:bg-gray-900/80 text-gray-500 dark:text-gray-500 border-gray-200 dark:border-gray-700"
                >
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Enhanced Focus Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-space-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
              Focus Areas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  className="text-xs font-space-mono bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge className="text-xs font-space-mono bg-gray-600 dark:bg-gray-400 text-white dark:text-black">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-6 border-t border-gray-100/50 dark:border-gray-800/50">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between p-0 h-auto text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 group/button"
            asChild
          >
            <Link href={`/projects/${project.id}`} className="flex items-center justify-between w-full py-3 px-1">
              <span className="font-space-mono text-sm font-medium">Explore Project</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover/button:bg-black/10 dark:group-hover/button:bg-white/10 transition-colors">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
