"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const certifications = [
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera • DeepLearning.AI",
    date: "2024",
    status: "Completed",
    credentialId: "DL2024-UC-789",
    skills: ["Neural Networks", "Deep Learning", "TensorFlow", "Computer Vision", "NLP", "CNN", "RNN"],
    image: "/images/coursera-deep-learning-cert.png",
    link: "https://coursera.org/verify/specialization/XXXXXXXX",
    description:
      "Comprehensive specialization covering neural networks, deep learning, and practical applications in computer vision and natural language processing.",
  },
  {
    title: "Machine Learning Engineer",
    issuer: "Google Cloud Platform",
    date: "2023",
    status: "Completed",
    credentialId: "GCP-MLE-456",
    skills: ["MLOps", "TensorFlow", "Cloud ML", "AutoML", "Kubernetes"],
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    description: "Professional certification for designing and implementing ML solutions on Google Cloud Platform.",
  },
  {
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    date: "2023",
    status: "Completed",
    credentialId: "AWS-MLS-123",
    skills: ["AWS SageMaker", "ML Pipeline", "Data Engineering", "Model Deployment"],
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    description:
      "Specialty certification demonstrating expertise in building, training, and deploying ML models on AWS.",
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    date: "2022",
    status: "Completed",
    credentialId: "TF-DEV-321",
    skills: ["TensorFlow", "Keras", "Computer Vision", "NLP", "Time Series"],
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    description:
      "Official certification demonstrating proficiency in using TensorFlow for machine learning applications.",
  },
]

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="certifications" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Certifications
            </h2>
            <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-black dark:text-gray-300 font-space-mono text-sm md:text-base">
              Professional certifications and credentials demonstrating expertise in AI, machine learning, and cloud technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {certifications.slice(0, 2).map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50 h-full overflow-hidden group-hover:scale-105 transform-gpu">
                <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={`${cert.title} Certificate`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay with short description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-orbitron text-xl font-semibold text-white mb-2">
                      {cert.title}
                    </h3>
                    <p className="font-space-mono text-sm text-gray-200">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-8 py-3 rounded-lg group"
          >
            <a href="/certifications" className="flex items-center gap-2">
              Explore More Certifications
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
