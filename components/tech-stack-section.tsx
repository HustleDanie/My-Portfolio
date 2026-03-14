"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

const techStack = [
  // Row 1 - Languages & Core
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "R", logo: "https://cdn.simpleicons.org/r/276DC3" },
  { name: "C++", logo: "https://cdn.simpleicons.org/cplusplus/00599C" },
  { name: "Julia", logo: "https://cdn.simpleicons.org/julia/9558B2" },
  { name: "Scala", logo: "https://cdn.simpleicons.org/scala/DC322F" },
  { name: "Go", logo: "https://cdn.simpleicons.org/go/00ADD8" },

  // Row 2 - ML/AI Frameworks
  { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "Keras", logo: "https://cdn.simpleicons.org/keras/D00000" },
  { name: "scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
  { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
  { name: "JAX", logo: "https://cdn.simpleicons.org/jax/A8B9CC" },
  { name: "ONNX", logo: "https://cdn.simpleicons.org/onnx/005CED" },

  // Row 3 - Data & Cloud
  { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/150458" },
  { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
  { name: "Apache Spark", logo: "https://cdn.simpleicons.org/apachespark/E25A1C" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
  { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
  { name: "Elasticsearch", logo: "https://cdn.simpleicons.org/elasticsearch/005571" },

  // Row 4 - Tools & DevOps
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Jupyter", logo: "https://cdn.simpleicons.org/jupyter/F37626" },
  { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "MLflow", logo: "https://cdn.simpleicons.org/mlflow/0194E2" },
  { name: "OpenCV", logo: "https://cdn.simpleicons.org/opencv/5C3EE8" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonwebservices/FF9900" },
]

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="tech-stack" ref={ref} className="py-12 md:py-20 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -60, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Tech Stack
            </h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -40, scale: 0.9, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, x: -40, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.025, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center gap-1 sm:gap-2 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-muted-foreground/50 transition-all duration-300 group-hover:scale-110 p-2 sm:p-3">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-space-mono text-center truncate w-full">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

