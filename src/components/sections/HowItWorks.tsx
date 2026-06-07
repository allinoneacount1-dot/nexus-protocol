"use client"

import { Wallet, Search, Bell, DollarSign } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, FadeIn, StaggerContainer } from "@/components/ui"

const steps = [
  {
    icon: <Wallet className="w-7 h-7" />,
    step: "01",
    title: "Connect",
    description: "Connect your wallet or add watchlist addresses. No KYC required. Supports all major Solana and EVM wallets.",
  },
  {
    icon: <Search className="w-7 h-7" />,
    step: "02",
    title: "Analyze",
    description: "Our AI scans the entire market 24/7, analyzing contracts, liquidity, social signals, and on-chain patterns.",
  },
  {
    icon: <Bell className="w-7 h-7" />,
    step: "03",
    title: "Alert",
    description: "Receive real-time alerts for rugs, whale moves, and alpha opportunities via app, Telegram, or Discord.",
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    step: "04",
    title: "Profit",
    description: "Act on signals with one-click trading. Execute faster than anyone else and capture the alpha before it disappears.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <SectionHeading className="mt-4">
            Four Steps to <span className="gradient-text">Alpha</span>
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              Getting started takes less than 60 seconds. No credit card required for the free tier.
            </SectionDescription>
          </div>
        </div>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.15}>
              <div className="relative text-center group">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent-primary/30 to-transparent" />
                )}

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl glass mb-6 group-hover:border-accent-primary/30 transition-colors duration-300">
                  <div className="text-accent-primary">{step.icon}</div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-primary text-black text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
