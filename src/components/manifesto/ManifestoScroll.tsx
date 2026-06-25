import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import StatCounter from "./StatCounter"

gsap.registerPlugin(ScrollTrigger)

const BLOCKS = [
  {
    id: "convergence",
    content: (
      <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-display font-bold leading-[0.9] tracking-tight text-white">
        THE CONVERGENCE
        <br />
        IS HERE
      </h2>
    ),
  },
  {
    id: "coins",
    content: (
      <div className="space-y-4">
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-medium text-white/80 leading-tight">
          <StatCounter target={17000} suffix="+" className="text-[clamp(2rem,5.5vw,5rem)]" />
          <br />
          coins tracked in real-time
        </p>
      </div>
    ),
  },
  {
    id: "tvl",
    content: (
      <div className="space-y-4">
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-medium text-white/80 leading-tight">
          <StatCounter target={71} prefix="$" suffix="B+" className="text-[clamp(2rem,5.5vw,5rem)]" />
          <br />
          TVL monitored across all chains
        </p>
      </div>
    ),
  },
  {
    id: "ai",
    content: (
      <div className="space-y-4">
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-medium text-white/80 leading-tight">
          <StatCounter target={60} suffix="+" className="text-[clamp(2rem,5.5vw,5rem)]" />
          <br />
          AI requests processed per minute
        </p>
      </div>
    ),
  },
  {
    id: "cost",
    content: (
      <div className="space-y-4">
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-medium text-white/80 leading-tight">
          <StatCounter target={0} prefix="$" className="text-[clamp(2rem,5.5vw,5rem)]" />
          <br />
          spent on APIs
        </p>
      </div>
    ),
  },
  {
    id: "final",
    content: (
      <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-display font-bold leading-tight tracking-tight text-white/90">
        This is not a demo.
        <br />
        <span className="text-[#00F5FF]">This is the future.</span>
      </h2>
    ),
  },
]

export default function ManifestoScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const blocks = sectionRef.current.querySelectorAll("[data-manifesto-block]")

    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      )
    })

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        background:
          "radial-gradient(ellipse at 50% 50%, #0a1628 0%, #050a14 70%, #020408 100%)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          blocks.length &&
          Array.from(blocks).some(
            (b) => b === t.trigger || sectionRef.current?.contains(t.trigger as Node)
          )
        ) {
          t.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      {/* Gradient background layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 -z-10 bg-[#020408] transition-colors duration-1000"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {BLOCKS.map((block, i) => (
          <div
            key={block.id}
            data-manifesto-block
            className="min-h-screen flex items-center"
          >
            <div className="w-full py-20">
              {block.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
