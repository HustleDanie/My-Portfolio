"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: "neural-network-playground",
    title: "Neural Network Playground",
    description:
      "Hands-on exploration of neural architectures and training dynamics with real-time visualization and experimentation tools.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["TensorFlow", "React", "D3.js", "Python", "WebGL", "TypeScript", "Next.js", "Tailwind CSS"],
    links: [
      { label: "Live Site", url: "#" },
      { label: "Frontend", url: "#" },
    ],
  },
  {
    id: "deep-rl-playground",
    title: "Deep RL Playground",
    description:
      "Interactive platform for training and testing reinforcement learning agents across various environments with real-time performance metrics and visualization.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["PyTorch", "Gymnasium", "React", "Python", "TensorBoard", "TypeScript", "Next.js", "Tailwind CSS"],
    links: [
      { label: "Live Site", url: "#" },
      { label: "Frontend", url: "#" },
    ],
  },
  {
    id: "vision-transformer-training",
    title: "Vision Transformer Training",
    description:
      "Advanced training interface for Vision Transformers (ViT) with support for image classification, object detection, and transfer learning capabilities.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["PyTorch", "Transformers", "React", "Python", "OpenCV", "TypeScript", "Next.js", "Tailwind CSS"],
    links: [
      { label: "Live Site", url: "#" },
      { label: "Frontend", url: "#" },
    ],
  },
  {
    id: "cnn-computer-vision",
    title: "CNN Computer Vision",
    description:
      "Comprehensive convolutional neural network training platform for image classification and computer vision tasks with interactive visualization.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["TensorFlow", "Keras", "React", "Python", "OpenCV", "TypeScript", "Next.js", "Tailwind CSS"],
    links: [
      { label: "Live Site", url: "#" },
      { label: "Frontend", url: "#" },
    ],
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            Research Projects
          </h1>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 max-w-md mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-space-mono bg-white dark:bg-gray-900"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Visual Area - Top Half */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Area - Bottom Half */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Title */}
                  <h3 className="font-orbitron text-2xl font-bold mb-3 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-space-mono text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        className="font-space-mono text-xs bg-black dark:bg-white text-white dark:text-black border-0 px-3 py-1 rounded-md"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge className="font-space-mono text-xs bg-black dark:bg-white text-white dark:text-black border-0 px-3 py-1 rounded-md">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                    {project.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.url}
                        className="flex items-center gap-1 font-space-mono text-sm text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="font-space-mono text-gray-600 dark:text-gray-400">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
