"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { X, ExternalLink, Award, Calendar, CheckCircle, ZoomIn } from "lucide-react"
import Image from "next/image"

const certifications = [
  {
    title: "B.Sc. Computer Science",
    issuer: "University of Ibadan",
    date: "2024",
    status: "Completed",
    credentialId: "UI-CS-2024",
    skills: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Computer Networks", "AI/ML", "Operating Systems"],
    image: "/images/Statementofresult.jpg",
    link: "",
    description:
      "Bachelor of Science degree in Computer Science from one of Nigeria's premier universities, providing a strong foundation in computing theory and practical software development.",
    achievements: [
      "Completed comprehensive coursework in core computer science fundamentals",
      "Developed proficiency in programming languages and software development",
      "Studied advanced topics in artificial intelligence and machine learning",
      "Gained expertise in database design and management systems",
      "Built practical projects applying theoretical knowledge to real-world problems",
    ],
  },
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
    achievements: [
      "Built and trained deep neural networks from scratch",
      "Implemented CNN architectures for image recognition",
      "Developed sequence models using RNN and LSTM",
      "Applied transfer learning and fine-tuning techniques",
      "Mastered optimization algorithms and hyperparameter tuning",
    ],
  },
]

type Certification = typeof certifications[0]

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [showFullImage, setShowFullImage] = useState(false)

  return (
    <section id="certifications" ref={ref} className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-16 text-center"
          >
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Certifications
            </h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.credentialId}
              initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <Card className="bg-card border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg h-full overflow-hidden group-hover:scale-[1.02] transform-gpu rounded-xl md:rounded-none shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.08)] md:shadow-none">
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={`${cert.title} Certificate`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay with short description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 md:p-6">
                    <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                      {cert.title}
                    </h3>
                    <p className="font-space-mono text-xs sm:text-sm text-gray-200 line-clamp-2 sm:line-clamp-none">
                      {cert.description}
                    </p>
                    <p className="font-space-mono text-xs text-gray-400 mt-2">
                      Click to view details
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => { setSelectedCert(null); setShowFullImage(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 w-full sm:max-w-2xl sm:mx-4 max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-2xl rounded-t-2xl sm:rounded-none flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag indicator for mobile */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>

              {/* Sticky close button */}
              <button
                onClick={() => { setSelectedCert(null); setShowFullImage(false); }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1">
                {/* Modal Header with clickable image */}
                <div 
                  className="relative h-36 sm:h-48 md:h-56 overflow-hidden cursor-pointer group/image"
                  onClick={() => setShowFullImage(true)}
                >
                  <Image
                    src={selectedCert.image || "/placeholder.svg"}
                    alt={selectedCert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Tap to view full indicator */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-space-mono opacity-80 group-hover/image:opacity-100 transition-opacity">
                    <ZoomIn className="h-3 w-3" />
                    <span className="hidden sm:inline">View Full Image</span>
                    <span className="sm:hidden">Tap to view</span>
                  </div>
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-4 right-4">
                    <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                      {selectedCert.title}
                    </h3>
                    <p className="font-space-mono text-xs sm:text-sm text-gray-300">
                      {selectedCert.issuer}
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Status and Date */}
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{selectedCert.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-space-mono text-green-600 dark:text-green-400">
                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{selectedCert.status}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400">
                      <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-[150px] sm:max-w-none">ID: {selectedCert.credentialId}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-orbitron text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 sm:mb-2">
                      About This Certification
                    </h4>
                    <p className="font-space-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedCert.description}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-orbitron text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 sm:mb-3">
                      What I Achieved
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {selectedCert.achievements?.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-orbitron text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 sm:mb-3">
                      Skills Covered
                    </h4>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-space-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-center truncate"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verify Link */}
                  {selectedCert.link && (
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex px-4 py-3 sm:py-2 bg-black dark:bg-white text-white dark:text-black font-space-mono text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify Credential
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen image viewer */}
      <AnimatePresence>
        {showFullImage && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
            onClick={() => setShowFullImage(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Hint text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs sm:text-sm font-space-mono">
              Tap anywhere to close
            </div>

            {/* Full image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full p-4 sm:p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedCert.image || "/placeholder.svg"}
                alt={selectedCert.title}
                fill
                className="object-contain"
                onClick={() => setShowFullImage(false)}
              />
            </motion.div>

            {/* Title overlay at bottom */}
            <div className="absolute bottom-12 sm:bottom-16 left-4 right-4 text-center">
              <h4 className="font-orbitron text-sm sm:text-base text-white font-semibold">
                {selectedCert.title}
              </h4>
              <p className="font-space-mono text-xs text-white/60 mt-1">
                {selectedCert.issuer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
