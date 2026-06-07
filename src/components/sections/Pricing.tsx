"use client"

import { Check, Sparkles } from "lucide-react"
import { SectionLabel, SectionHeading, SectionDescription, Button, FadeIn, StaggerContainer } from "@/components/ui"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with basic protection.",
    features: [
      "Basic rug detection",
      "5 wallet tracking",
      "Daily market scan",
      "Community Discord access",
      "Email alerts",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious traders who want the full edge.",
    features: [
      "Advanced AI rug detection",
      "Unlimited wallet tracking",
      "Real-time alerts (all channels)",
      "Whale movement tracking",
      "Alpha aggregation feed",
      "Portfolio analytics",
      "Priority support",
      "API access",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams, funds, and protocols.",
    features: [
      "Everything in Pro",
      "Custom AI model training",
      "Dedicated account manager",
      "White-label dashboard",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
      "Unlimited API calls",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading className="mt-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </SectionHeading>
          <div className="mt-6 flex justify-center">
            <SectionDescription>
              Start free. Upgrade when you&apos;re ready. No hidden fees, no surprises.
            </SectionDescription>
          </div>
        </div>

        {/* Plans */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  plan.highlighted
                    ? "glass animated-border scale-105 shadow-lg shadow-accent-primary/10"
                    : "glass"
                }`}
              >
                {/* Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-black text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                {/* Plan info */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.period && (
                      <span className="text-text-muted text-sm">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
                  onClick={() => console.log(`${plan.name} plan selected`)}
                >
                  {plan.cta}
                </Button>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
