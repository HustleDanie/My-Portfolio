"use client"

import { usePathname } from "next/navigation"
import Navigation from "./navigation"

export function NavigationWrapper() {
  const pathname = usePathname()
  
  // Hide navigation on research page since it has its own combined header
  if (pathname === "/research") {
    return null
  }
  
  return <Navigation />
}

