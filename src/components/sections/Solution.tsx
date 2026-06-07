"use client"

import { motion } from "framer-motion"
import { ArrowRight, Database, Cpu, Radar, Rocket } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, GlassCard, FadeIn, StaggerContainer } from "@/components/ui"

const flowSteps = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Ingestion",
    description: "Real-time on-chain data, social signals, and liquidity monitoring across 10+ blockchains.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Processing",
    description: "Proprietary ML models analyze patterns, detect anomalies, and score risk in milliseconds.",
  },
  {
    icon: <Radar className="w-6 h-6" />,
    title: "Signal Generation",
    description: "Actionable alerts for rugs, whale moves, and alpha opportunities delivered instantly.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Execution Ready",
    description: "One-click actions integrated with DEXs. From signal to trade in under 2 seconds.",
  },
]

export function Solution() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>Our Solution</SectionLabel>
          <SectionHeading className="mt-4">
            Intelligence at <span className="gradient-text">Machine Speed</span>
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              NEXUS PROTOCOL combines real-time on-chain analysis with advanced AI to give you an unfair advantage in the crypto markets.
            </SectionDescription>
          </div>
        </div>

        {/* Flow Diagram */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {flowSteps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1}>
              <GlassCard className="h-full relative">
                {/* Step number */}
                <div className="absolute top-4 right-4 text-5xl font-display font-bold text-white/[0.03]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4 text-accent-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </StaggerContainer>

        {/* Connection line (desktop) */}
        <div className="hidden lg:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-2 text-text-muted"
          >
            {flowSteps.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-primary/40" />
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-accent-primary/20" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Highlight Card */}
        <FadeIn delay={0.4} className="mt-12">
          <div className="glass rounded-2xl p-8 md:p-12 animated-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  From Raw Data to <span className="gradient-text-subtle">Alpha</span> in Milliseconds
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Our pipeline processes over 50,000 on-chain events per second, cross-referencing them with social sentiment, liquidity patterns, and historical rug signatures. The result is a risk score and alpha signal delivered before anyone else can react.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "<50ms", label: "Latency" },
                  { value: "99.7%", label: "Accuracy" },
                  { value: "10+", label: "Chains" },
                  { value: "24/7", label: "Monitoring" },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-text-muted text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
