"use client"

import { motion } from "framer-motion"
import { AnimatedCounter, FadeIn } from "@/components/ui"

const stats = [
  { value: 2.5, suffix: "B+", label: "Assets Protected", prefix: "$" },
  { value: 150, suffix: "K+", label: "Rugs Detected", prefix: "" },
  { value: 50, suffix: "K+", label: "Active Users", prefix: "" },
  { value: 99.7, suffix: "%", label: "Detection Accuracy", prefix: "" },
]

export function Stats() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Numbers That <span className="gradient-text">Speak</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Trusted by thousands of traders and protocols worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="glass rounded-2xl p-8 text-center card-hover">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text font-display mb-3">
                  {stat.prefix}
                  {stat.value % 1 === 0 ? (
                    <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                      {stat.suffix}
                    </motion.span>
                  )}
                </div>
                <div className="text-text-secondary text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
