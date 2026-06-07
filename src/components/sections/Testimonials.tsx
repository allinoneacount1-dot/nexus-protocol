"use client"

import { Star } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, FadeIn, StaggerContainer } from "@/components/ui"

const testimonials = [
  {
    name: "Alex Chen",
    role: "DeFi Trader",
    quote:
      "NEXUS saved me from at least 3 rug pulls in the first week alone. The AI detection is scary accurate. I got an alert 47 seconds before the liquidity was pulled on a token I was about to airdrop into.",
    rating: 5,
    initials: "AC",
  },
  {
    name: "Sarah Mitchell",
    role: "Crypto Fund Manager",
    quote:
      "We integrated NEXUS into our workflow and our alpha capture rate increased by 340%. The whale tracking feature alone is worth 10x the subscription price. This is the tool I wish I had in 2021.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Marcus Rivera",
    role: "NFT & Memecoin Degen",
    quote:
      "I was skeptical at first, but the real-time alerts are genuinely game-changing. Caught a 12x on a memecoin because NEXUS flagged whale accumulation before anyone else noticed. Paid for the year in one trade.",
    rating: 5,
    initials: "MR",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>Testimonials</SectionLabel>
          <SectionHeading className="mt-4">
            Loved by <span className="gradient-text">Traders</span>
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              Don&apos;t just take our word for it. Here&apos;s what our users have to say.
            </SectionDescription>
          </div>
        </div>

        {/* Testimonial Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="glass rounded-2xl p-8 card-hover h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent-primary text-accent-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-black font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-text-muted text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
