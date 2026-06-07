"use client"

import { Shield, Eye, Zap, Bell, PieChart, Brain } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, FeatureCard, FadeIn, StaggerContainer } from "@/components/ui"

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Rug Detection",
    description:
      "AI-powered analysis of contract code, liquidity locks, and deployer history. Detect rug pulls before they happen with 99.7% accuracy.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Whale Tracking",
    description:
      "Monitor whale wallets in real-time. Get instant alerts when smart money moves, adds liquidity, or dumps positions.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Alpha Aggregation",
    description:
      "Curated alpha from on-chain signals, social sentiment, and cross-chain opportunities. Filtered noise, pure signal.",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Real-time Alerts",
    description:
      "Customizable push notifications for price movements, liquidity changes, whale activity, and risk score updates.",
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: "Portfolio Tracking",
    description:
      "Track all your wallets across chains. P&L analysis, risk exposure, and automated tax reporting in one dashboard.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Analysis",
    description:
      "Natural language queries about any token. Our AI summarizes contract risk, holder distribution, and market sentiment instantly.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>Features</SectionLabel>
          <SectionHeading className="mt-4">
            Everything You Need to <span className="gradient-text">Dominate</span>
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              A complete toolkit for crypto traders who refuse to leave money on the table. Every feature designed for speed, accuracy, and action.
            </SectionDescription>
          </div>
        </div>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.08}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0}
              />
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
