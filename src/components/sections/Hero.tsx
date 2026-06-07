"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { Button, GlowingOrb, StatCard } from "@/components/ui"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <GlowingOrb color="primary" size="xl" className="absolute top-1/4 -left-32 animate-float" />
        <GlowingOrb color="secondary" size="lg" className="absolute bottom-1/4 -right-24 animate-float" style={{ animationDelay: "2s" }} />
        <GlowingOrb color="tertiary" size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              Now Live on Solana Mainnet
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6"
          >
            <span className="gradient-text">NEXUS</span>
            <br />
            <span className="text-white">PROTOCOL</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            AI-Powered Crypto Intelligence Platform.
            <br className="hidden sm:block" />
            <span className="text-text-muted">Detect rugs. Track whales. Find alpha.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => console.log("Get Started clicked")}
              className="w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => console.log("View Demo clicked")}
              className="w-full sm:w-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 card-hover">
              <StatCard value="2.4M+" label="Tokens Scanned" delay={0} />
            </div>
            <div className="glass rounded-2xl p-6 card-hover">
              <StatCard value="150K+" label="Rugs Detected" delay={0.1} />
            </div>
            <div className="glass rounded-2xl p-6 card-hover">
              <StatCard value="12K+" label="Alpha Calls" delay={0.2} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => {
            const el = document.querySelector("#trusted-by")
            if (el) el.scrollIntoView({ behavior: "smooth" })
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-primary transition-colors"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  )
}
