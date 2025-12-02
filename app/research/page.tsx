"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Menu,
  Search,
  Brain,
  Zap,
  Eye,
  Network,
  Cpu,
  Code,
  Database,
  Grid3x3,
  List,
  User,
  FileText,
  Award,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const blogPosts = [
  {
    id: "1",
    title: "Understanding Transformer Architecture",
    subtitle: "Deep dive into the transformer architecture and its applications in modern AI systems.",
    author: "Uche Daniel",
    authorImage: "/placeholder-user.jpg",
    date: "Jun 15",
    claps: 1200,
    comments: 45,
    image: "/placeholder.svg?height=400&width=400",
    link: "#",
    category: "Deep Learning",
  },
  {
    id: "2",
    title: "Reinforcement Learning Fundamentals",
    subtitle: "Exploring the core concepts and algorithms behind reinforcement learning.",
    author: "Uche Daniel",
    authorImage: "/placeholder-user.jpg",
    date: "Jun 12",
    claps: 890,
    comments: 32,
    image: "/placeholder.svg?height=400&width=400",
    link: "#",
    category: "Reinforcement Learning",
  },
  {
    id: "3",
    title: "Computer Vision with CNNs",
    subtitle: "A comprehensive guide to convolutional neural networks for image processing.",
    author: "Uche Daniel",
    authorImage: "/placeholder-user.jpg",
    date: "Jun 10",
    claps: 2100,
    comments: 78,
    image: "/placeholder.svg?height=400&width=400",
    link: "#",
    category: "Computer Vision",
  },
  {
    id: "4",
    title: "Large Language Models Explained",
    subtitle: "Understanding how LLMs work, their capabilities, and their impact on AI research.",
    author: "Uche Daniel",
    authorImage: "/placeholder-user.jpg",
    date: "Jun 8",
    claps: 3400,
    comments: 156,
    image: "/placeholder.svg?height=400&width=400",
    link: "#",
    category: "Natural Language Processing",
  },
  {
    id: "5",
    title: "Neural Network Optimization",
    subtitle: "Advanced techniques for training faster and more efficient deep learning models.",
    author: "Uche Daniel",
    authorImage: "/placeholder-user.jpg",
    date: "Jun 5",
    claps: 1650,
    comments: 67,
    image: "/placeholder.svg?height=400&width=400",
    link: "#",
    category: "Neural Networks",
  },
]

const navItems = [
  { name: "Home", href: "/", icon: <Zap className="w-4 h-4" /> },
  { name: "About", href: "/about", icon: <User className="w-4 h-4" /> },
  { name: "Projects", href: "/projects", icon: <Code className="w-4 h-4" /> },
  { name: "Blogs", href: "/research", icon: <FileText className="w-4 h-4" /> },
  { name: "Certifications", href: "/certifications", icon: <Award className="w-4 h-4" /> },
]

export default function ResearchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Combined Navbar and Header */}
      <header className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row - Logo and Navigation */}
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-black dark:text-white" />
              <span className="text-xl font-orbitron font-bold tracking-wider text-black dark:text-white">
                HustleDanie
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
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
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setNavOpen(!navOpen)}>
                {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {navOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 py-2 font-space-mono transition-colors ${
                      pathname === item.href ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Row - Search Bar and Controls */}
          <div className="flex items-center gap-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="hidden lg:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold text-black dark:text-white">Blogs</span>
            </Link>
            <div className="flex-1 flex justify-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 font-space-mono text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid"
                    ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid3x3 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto pt-[9.5rem]">
        {/* Left Sidebar */}
        <aside
          className={`fixed lg:sticky top-[9.5rem] lg:top-[9.5rem] h-[calc(100vh-9.5rem)] w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-30 transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            sidebarVisible ? "lg:translate-x-0 lg:w-64" : "lg:-translate-x-full lg:w-0"
          } overflow-y-auto`}
        >
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === null
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Brain className="h-5 w-5" />
              <span className="font-space-mono text-sm">Machine Learning</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Deep Learning")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "Deep Learning"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Zap className="h-5 w-5" />
              <span className="font-space-mono text-sm">Deep Learning</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Natural Language Processing")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "Natural Language Processing"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Code className="h-5 w-5" />
              <span className="font-space-mono text-sm">Natural Language Processing</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Computer Vision")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "Computer Vision"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Eye className="h-5 w-5" />
              <span className="font-space-mono text-sm">Computer Vision</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Reinforcement Learning")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "Reinforcement Learning"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Network className="h-5 w-5" />
              <span className="font-space-mono text-sm">Reinforcement Learning</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Neural Networks")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "Neural Networks"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Cpu className="h-5 w-5" />
              <span className="font-space-mono text-sm">Neural Networks</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Data Science")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "Data Science"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Database className="h-5 w-5" />
              <span className="font-space-mono text-sm">Data Science</span>
            </button>
            <button
              onClick={() => setSelectedCategory("AI Systems")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedCategory === "AI Systems"
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Brain className="h-5 w-5" />
              <span className="font-space-mono text-sm">AI Systems</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="px-4 lg:px-8 py-6">
            {/* Articles Feed */}
            {viewMode === "list" ? (
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Border line before title (skip first item) */}
                      {index > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-800 mb-4"></div>
                      )}
                      {/* Title */}
                      <Link href={post.link}>
                        <h2 className="font-hustledanie text-2xl font-bold text-black dark:text-white mb-2 group-hover:underline line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      {/* Subtitle */}
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 font-space-mono text-sm">
                        {post.subtitle}
                      </p>
                    </div>

                    {/* Article Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={post.link}>
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        {/* Article Image */}
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          {/* Title */}
                          <h2 className="font-hustledanie text-xl font-bold text-black dark:text-white mb-2 group-hover:underline line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 font-space-mono text-sm flex-1">
                            {post.subtitle}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
