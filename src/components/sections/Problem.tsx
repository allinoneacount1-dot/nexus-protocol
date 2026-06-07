"use client"

import { AlertTriangle, Clock, TrendingDown } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, GlassCard, FadeIn, StaggerContainer } from "@/components/ui"

const painPoints = [
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Rug Pulls Everywhere",
    description:
      "Over $4.6B lost to rug pulls in 2024 alone. By the time you notice, it's already too late. Manual research can't keep up with the speed of new token launches.",
    accent: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Information Overload",
    description:
      "Thousands of new tokens launch daily across multiple chains. No human can monitor Twitter, Discord, Telegram, and on-chain data simultaneously 24/7.",
    accent: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Missed Opportunities",
    description:
      "Alpha windows last minutes, not hours. Without real-time alerts and AI analysis, you're always one step behind the smart money and insider wallets.",
    accent: "text-orange-400",
    bg: "bg-orange-500/10",
  },
]

export function Problem() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>The Problem</SectionLabel>
          <SectionHeading className="mt-4">
            Crypto Trading is <span className="gradient-text">Broken</span>
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              The crypto market moves at machine speed, but most traders are still using tools from 2017. The result? Billions lost, countless opportunities missed.
            </SectionDescription>
          </div>
        </div>

        {/* Pain Point Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.15}>
              <GlassCard className="h-full">
                <div className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center mb-5 ${point.accent}`}>
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {point.description}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
