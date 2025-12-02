"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Smartphone, Monitor, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { isMobileDevice, getMobileDeviceType } from "@/utils/device-detection"

interface MobileRestrictionProps {
  children: React.ReactNode
  projectTitle?: string
}

export function MobileRestriction({ children, projectTitle }: MobileRestrictionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [deviceType, setDeviceType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkDevice = () => {
      const mobile = isMobileDevice()
      const type = getMobileDeviceType()
      setIsMobile(mobile)
      setDeviceType(type)
      setIsLoading(false)
    }

    checkDevice()

    // Also check on resize
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                  <Smartphone className="relative h-16 w-16 mx-auto text-red-500 dark:text-red-400" />
                </div>

                <h1 className="font-orbitron text-2xl font-bold mb-4 text-foreground">Desktop Required</h1>

                <p className="text-muted-foreground mb-6 font-space-mono text-sm leading-relaxed">
                  {projectTitle ? `The "${projectTitle}" project` : "This project"} requires a desktop or laptop
                  computer for the best experience. The interactive visualizations and complex interfaces are optimized
                  for larger screens.
                </p>

                <Card className="bg-muted/50 border-muted-foreground/20 mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-lg"></div>
                        <Monitor className="relative h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <span className="font-space-mono text-sm text-green-600 dark:text-green-400 font-medium">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-space-mono">
                      Desktop or laptop with screen width ≥ 1024px
                    </p>
                  </CardContent>
                </Card>

                {deviceType && (
                  <p className="text-xs text-muted-foreground/70 font-space-mono mb-6">Detected: {deviceType} device</p>
                )}
              </div>

              <div className="space-y-3">
                <Button onClick={() => window.history.back()} variant="outline" className="w-full font-space-mono">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-space-mono shadow-lg"
                >
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
