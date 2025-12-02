"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import {
  Code,
  Brain,
  Database,
  Cloud,
  Cpu,
  Terminal,
  GitBranch,
  Server,
  Zap,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const techStack = [
  {
    category: "Languages",
    technologies: [
      { name: "Python", icon: Code, color: "text-blue-500", logo: "/images/tech-logos/python.svg" },
      { name: "JavaScript", icon: Code, color: "text-yellow-500", logo: "/images/tech-logos/javascript.svg" },
      { name: "TypeScript", icon: Code, color: "text-blue-600", logo: "/images/tech-logos/typescript.svg" },
      { name: "R", icon: Code, color: "text-blue-400", logo: "/images/tech-logos/r.svg" },
      { name: "SQL", icon: Database, color: "text-cyan-500", logo: "/images/tech-logos/sql.svg" },
    ],
  },
  {
    category: "ML/AI Frameworks",
    technologies: [
      { name: "TensorFlow", icon: Brain, color: "text-orange-500", logo: "/images/tech-logos/tensorflow.svg" },
      { name: "PyTorch", icon: Brain, color: "text-red-500", logo: "/images/tech-logos/pytorch.svg" },
      { name: "Keras", icon: Brain, color: "text-red-600", logo: "/images/tech-logos/keras.svg" },
      { name: "Scikit-learn", icon: Brain, color: "text-orange-400", logo: "/images/tech-logos/scikit-learn.svg" },
      { name: "Hugging Face", icon: Brain, color: "text-yellow-400", logo: "/images/tech-logos/huggingface.svg" },
    ],
  },
  {
    category: "Cloud & DevOps",
    technologies: [
      { name: "AWS", icon: Cloud, color: "text-orange-500", logo: "/images/tech-logos/aws.svg" },
      { name: "GCP", icon: Cloud, color: "text-blue-500", logo: "/images/tech-logos/gcp.svg" },
      { name: "Docker", icon: Server, color: "text-blue-400", logo: "/images/tech-logos/docker.svg" },
      { name: "Kubernetes", icon: Server, color: "text-blue-600", logo: "/images/tech-logos/kubernetes.svg" },
      { name: "Git", icon: GitBranch, color: "text-orange-600", logo: "/images/tech-logos/git.svg" },
    ],
  },
  {
    category: "Data & Analytics",
    technologies: [
      { name: "Pandas", icon: Database, color: "text-blue-500", logo: "/images/tech-logos/pandas.svg" },
      { name: "NumPy", icon: Database, color: "text-blue-600", logo: "/images/tech-logos/numpy.svg" },
      { name: "Apache Spark", icon: Zap, color: "text-orange-500", logo: "/images/tech-logos/spark.svg" },
      { name: "PostgreSQL", icon: Database, color: "text-blue-700", logo: "/images/tech-logos/postgresql.svg" },
      { name: "MongoDB", icon: Database, color: "text-green-500", logo: "/images/tech-logos/mongodb.svg" },
    ],
  },
  {
    category: "Tools & Libraries",
    technologies: [
      { name: "Jupyter", icon: Terminal, color: "text-orange-500", logo: "/images/tech-logos/jupyter.svg" },
      { name: "Matplotlib", icon: Layers, color: "text-blue-500", logo: "/images/tech-logos/matplotlib.svg" },
      { name: "Seaborn", icon: Layers, color: "text-pink-500", logo: "/images/tech-logos/seaborn.svg" },
      { name: "Plotly", icon: Layers, color: "text-purple-500", logo: "/images/tech-logos/plotly.svg" },
      { name: "FastAPI", icon: Cpu, color: "text-green-500", logo: "/images/tech-logos/fastapi.svg" },
    ],
  },
]

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % techStack.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + techStack.length) % techStack.length)
  }

  return (
    <section id="tech-stack" ref={ref} className="py-20 relative bg-white dark:bg-black min-h-screen flex items-center">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Tech Stack
            </h2>
            <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-black dark:text-gray-300 font-space-mono">
              Technologies, frameworks, and tools I use to build intelligent systems and conduct AI research.
            </p>
          </motion.div>

          {/* Slider Container */}
          <div className="relative w-full">
            <div className="relative h-[600px] md:h-[700px] overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                {techStack.map((category, index) => {
                  if (index !== currentIndex) return null
                  return (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Card className="bg-white dark:bg-black border-0 h-full w-full">
                        <CardHeader className="pb-6 pt-8">
                          <CardTitle className="font-orbitron text-2xl md:text-3xl font-semibold text-black dark:text-white mb-8 text-center">
                            {category.category}
                          </CardTitle>
                        </CardHeader>

                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 px-8 pb-8">
                          {category.technologies.map((tech, techIndex) => {
                            const IconComponent = tech.icon
                            const hasError = imageErrors.has(tech.name)
                            return (
                              <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.4,
                                  delay: techIndex * 0.1,
                                }}
                                className="flex flex-col items-center gap-3 group"
                              >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-all duration-300 group-hover:scale-110 p-3">
                                  {tech.logo && !hasError ? (
                                    <img
                                      src={tech.logo}
                                      alt={tech.name}
                                      className="object-contain w-full h-full"
                                      onError={() => setImageErrors((prev) => new Set(prev).add(tech.name))}
                                    />
                                  ) : (
                                    <IconComponent className={`h-10 w-10 md:h-12 md:w-12 ${tech.color}`} />
                                  )}
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-black"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-black"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {techStack.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-black dark:bg-white w-8"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

