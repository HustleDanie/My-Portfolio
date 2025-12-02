import { AboutSection } from "@/components/about-section"
import { HeroSection } from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import { ResearchSection } from "@/components/research-section"
import { CertificationsSection } from "@/components/certifications-section"
import { TechStackSection } from "@/components/tech-stack-section"

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ResearchSection />
      <CertificationsSection />
      <TechStackSection />
    </main>
  )
}
