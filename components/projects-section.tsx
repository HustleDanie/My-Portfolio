"use client"

import { motion } from "framer-motion"
import { ArrowRight, Brain, Code, Cpu, Eye, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const featuredProjects = [
  {
    id: "neural-network-playground",
    title: "Neural Network Playground",
    subtitle: "Interactive Deep Learning Sandbox",
    description:
      "Hands-on exploration of neural architectures and training dynamics with real-time visualization and experimentation tools.",
    image: "/placeholder-logo.svg",
    technologies: ["TensorFlow", "React", "D3.js", "Python", "WebGL"],
    techIcons: [
      { name: "TensorFlow", icon: Brain, color: "text-orange-500" },
      { name: "React", icon: Code, color: "text-blue-500" },
      { name: "Python", icon: Cpu, color: "text-green-500" },
      { name: "WebGL", icon: Eye, color: "text-purple-500" },
    ],
    category: "Machine Learning",
    status: "Live Demo",
    features: [
      "Interactive Neural Network Builder",
      "Real-time Training Visualization",
      "Custom Dataset Upload",
      "Architecture Comparison",
    ],
  },
  {
    id: "deep-rl-playground",
    title: "Deep RL Playground",
    subtitle: "Reinforcement Learning Environment",
    description:
      "Interactive platform for training and testing reinforcement learning agents across various environments with real-time performance metrics and visualization.",
    image: "/placeholder-logo.svg",
    technologies: ["PyTorch", "Gymnasium", "React", "Python", "TensorBoard"],
    techIcons: [
      { name: "PyTorch", icon: Brain, color: "text-orange-500" },
      { name: "React", icon: Code, color: "text-blue-500" },
      { name: "Python", icon: Cpu, color: "text-green-500" },
      { name: "RL", icon: Zap, color: "text-yellow-500" },
    ],
    category: "Reinforcement Learning",
    status: "Live Demo",
    features: [
      "Multiple RL Algorithms",
      "Custom Environment Builder",
      "Real-time Training Metrics",
      "Agent Performance Comparison",
    ],
  },
  {
    id: "vision-transformer-training",
    title: "Vision Transformer Training",
    subtitle: "Computer Vision with Transformers",
    description:
      "Advanced training interface for Vision Transformers (ViT) with support for image classification, object detection, and transfer learning capabilities.",
    image: "/placeholder-logo.svg",
    technologies: ["PyTorch", "Transformers", "React", "Python", "OpenCV"],
    techIcons: [
      { name: "PyTorch", icon: Brain, color: "text-orange-500" },
      { name: "Transformers", icon: Code, color: "text-blue-500" },
      { name: "Python", icon: Cpu, color: "text-green-500" },
      { name: "Vision", icon: Eye, color: "text-purple-500" },
    ],
    category: "Computer Vision",
    status: "Live Demo",
    features: [
      "ViT Architecture Builder",
      "Image Dataset Management",
      "Transfer Learning Support",
      "Performance Analytics",
    ],
  },
]

const ProjectsSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-black dark:text-gray-300 font-space-mono text-sm md:text-base">
            Interactive AI projects and research tools showcasing practical applications of machine learning and deep learning.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-12 md:space-y-16 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start transition-all duration-300 border border-gray-300 dark:border-gray-700 rounded-lg p-6 md:p-8 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-gray-400/50 dark:hover:shadow-gray-500/50">
                  {/* Project Logo - Left Side */}
                  <div className="relative w-full md:w-1/2 lg:w-2/5 h-64 md:h-80 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
                    <img
                      src={project.image || "/placeholder-logo.svg"}
                      alt={project.title}
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      style={{ width: '100%', height: '100%', maxWidth: '200px', maxHeight: '200px' }}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-logo.svg"
                      }}
                    />
                  </div>

                  {/* Project Content - Right Side */}
                  <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center space-y-6">
                    {/* Header Section */}
                    <div className="space-y-3">
                      <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-black dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-space-mono text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-8 py-3 rounded-lg group"
          >
            <Link href="/projects" className="flex items-center gap-2">
              Explore More Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
