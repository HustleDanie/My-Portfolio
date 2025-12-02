"use client"

import { motion } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import { useInView } from "framer-motion"
import { ExternalLink, Award, CheckCircle, Calendar, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function CertificationsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [searchQuery, setSearchQuery] = useState("")

  // Filter certifications based on search query
  const filteredCertifications = useMemo(() => {
    if (!searchQuery.trim()) return certifications

    const query = searchQuery.toLowerCase()
    return certifications.filter(
      (cert) =>
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        cert.skills.some((skill) => skill.toLowerCase().includes(query))
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            Professional Certifications
          </h1>
          <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 font-space-mono text-sm md:text-base">
            Continuous learning and professional development in cutting-edge technologies.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search certifications by title, issuer, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:border-gray-400 dark:focus:border-gray-600 font-space-mono text-sm"
              />
            </div>
            <Button
              type="button"
              className="font-space-mono bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 md:px-8">
          {filteredCertifications.length > 0 ? (
            filteredCertifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50 h-full max-w-md mx-auto">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-space-mono">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {cert.status}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {cert.date}
                    </div>
                  </div>

                  <div className="relative w-full aspect-square mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={`${cert.title} Certificate`}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay with description and button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex-1 flex items-start">
                        <p className="text-white text-sm font-space-mono leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="font-space-mono bg-white text-black hover:bg-gray-200 w-full"
                      >
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          View Credentials
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>

                  <CardTitle className="font-orbitron text-lg font-semibold text-black dark:text-white mb-2">
                    {cert.title}
                  </CardTitle>

                  <CardDescription className="text-gray-600 dark:text-gray-400 font-space-mono text-sm">
                    {cert.issuer}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Content removed - description and button are now in the image overlay */}
                </CardContent>
              </Card>
            </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 font-space-mono">
                No certifications found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
