"use client"

import type React from "react"
import { useState } from "react"
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })

    setIsSubmitting(false)

    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <section id="contact" className="py-12 md:py-20 relative bg-gray-50 dark:bg-gray-900/50 mt-auto">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="font-orbitron text-2xl md:text-4xl font-bold mb-4 text-black dark:text-white">Get In Touch</h2>
          <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-sm md:text-base">
            Interested in collaborating on research, speaking engagements, or discussing AI? Send me a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="font-orbitron text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="text-sm font-space-mono text-gray-600 dark:text-gray-400 mb-2">Email</h4>
                <p className="flex items-center gap-2 text-gray-800 dark:text-gray-200 text-sm md:text-base">
                  <Mail className="h-4 w-4" />
                  <span>researcher@hustledanie.ai</span>
                </p>
              </div>

              <div>
                <h4 className="text-sm font-space-mono text-gray-600 dark:text-gray-400 mb-2">Location</h4>
                <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base">San Francisco, California</p>
              </div>

              <div>
                <h4 className="text-sm font-space-mono text-gray-600 dark:text-gray-400 mb-3 md:mb-4">Connect</h4>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href="#"
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-black dark:hover:border-white transition-colors"
                  >
                    <Twitter className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-black dark:hover:border-white transition-colors"
                  >
                    <Github className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-black dark:hover:border-white transition-colors"
                  >
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12">
              <h3 className="font-orbitron text-lg md:text-xl font-bold mb-3 md:mb-4 text-black dark:text-white">
                Research Inquiries
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                For research collaborations, paper discussions, or academic inquiries, please include relevant details
                in your message.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Response time: 2-3 business days</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-space-mono text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-space-mono text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-space-mono text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-space-mono text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white transition-colors resize-none text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-space-mono"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-black"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-6 md:pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} HustleDanie.AI. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
