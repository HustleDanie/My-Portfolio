"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Brain, Code, Zap, User, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", icon: <Zap className="w-4 h-4" /> },
  { name: "About", href: "/about", icon: <User className="w-4 h-4" /> },
  { name: "Projects", href: "/projects", icon: <Code className="w-4 h-4" /> },
  { name: "Blogs", href: "/research", icon: <FileText className="w-4 h-4" /> },
  { name: "Certifications", href: "/certifications", icon: <Award className="w-4 h-4" /> },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2)
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="h-8 w-8 text-black dark:text-white" />
          </motion.div>
          <motion.span
            className="text-xl font-orbitron font-bold tracking-wider text-black dark:text-white"
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
                    pathname === "/" && item.href !== "/"
                      ? "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      : pathname === item.href
                        ? "text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.icon}
                    {item.name}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black dark:bg-white transition-all duration-300 w-0 group-hover:w-full`}
                  ></span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`font-space-mono text-sm tracking-wider transition-colors relative group ${
                    pathname === item.href
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
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
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
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"
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
                      className="flex items-center space-x-2 py-2 font-space-mono transition-colors text-gray-600 dark:text-gray-400 w-full text-left"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 py-2 font-space-mono transition-colors ${
                        pathname === item.href ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
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
