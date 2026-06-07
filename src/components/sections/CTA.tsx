"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button, FadeIn } from "@/components/ui"

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-accent-secondary/5 to-accent-tertiary/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary mb-8"
          >
            <Zap className="w-8 h-8 text-black" />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ready to Trade <span className="gradient-text">Smarter</span>?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join 50,000+ traders who&apos;ve already upgraded their edge. Start free, no credit card required.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => console.log("Get Started Free clicked")}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => console.log("Talk to Sales clicked")}
            >
              Talk to Sales
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-text-muted text-sm mt-6">
            Free tier available • No credit card required • Cancel anytime
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
