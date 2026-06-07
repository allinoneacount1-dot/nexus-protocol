"use client"

import { ScrollProgress, GridBackground } from "@/components/ui"
import { Particles } from "@/components/3d/Particles"
import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { TrustedBy } from "@/components/sections/TrustedBy"
import { Problem } from "@/components/sections/Problem"
import { Solution } from "@/components/sections/Solution"
import { Features } from "@/components/sections/Features"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Stats } from "@/components/sections/Stats"
import { Pricing } from "@/components/sections/Pricing"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <GridBackground />
      <Particles />

      <div className="content-overlay relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustedBy />
          <Problem />
          <Solution />
          <Features />
          <HowItWorks />
          <Stats />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
