"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Brain, Code, Zap, User, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", icon: <Zap className="w-4 h-4" />, matchPaths: ["/"] },
  { name: "About", href: "/#about", icon: <User className="w-4 h-4" />, matchPaths: ["/about"] },
  { name: "Projects", href: "/#projects", icon: <Code className="w-4 h-4" />, matchPaths: ["/projects"] },
  { name: "Blogs", href: "/#research", icon: <FileText className="w-4 h-4" />, matchPaths: ["/blog", "/research"] },
  { name: "Certifications", href: "/#certifications", icon: <Award className="w-4 h-4" />, matchPaths: ["/certifications"] },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if current path matches nav item
  const isActive = (item: typeof navItems[0]) => {
    // Exact match for home
    if (item.href === "/" && pathname === "/") return true
    
    // Check if current path starts with any of the matchPaths
    return item.matchPaths?.some(path => 
      path !== "/" && pathname.startsWith(path)
    ) || false
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2)
      
      if (pathname === "/") {
        // Already on homepage, just scroll
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Navigate to homepage first, then scroll
        router.push(href)
      }
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-black dark:text-white" />
          </motion.div>
          <motion.span
            className="text-base sm:text-xl font-orbitron font-bold tracking-wider text-black dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            HustleDanie
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.href.startsWith("/#") ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`font-space-mono text-sm tracking-wider transition-colors relative group ${
                    isActive(item)
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.icon}
                    {item.name}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                      isActive(item) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`font-space-mono text-sm tracking-wider transition-colors relative group ${
                    isActive(item)
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.icon}
                    {item.name}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                      isActive(item) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              )}
            </div>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center space-x-2 py-2 font-space-mono transition-colors w-full text-left ${
                        isActive(item) ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      {isActive(item) && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-black dark:bg-white"></span>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 py-2 font-space-mono transition-colors ${
                        isActive(item) ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      {isActive(item) && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-black dark:bg-white"></span>
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
