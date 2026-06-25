import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "./ParticleField";
import HeroTicker from "./HeroTicker";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.querySelectorAll("span");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      letters,
      { opacity: 0, y: 30, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.05,
      }
    );

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );
    }

    if (ctasRef.current) {
      tl.fromTo(
        ctasRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    }

    if (scrollLineRef.current) {
      gsap.to(scrollLineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const title = "THE CONVERGENCE";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050508 0%, #0A0E27 100%)" }}
    >
      <ParticleField />

      {/* Scroll indicator */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-px h-24 bg-white/10">
        <div
          ref={scrollLineRef}
          className="w-full bg-cyan origin-top"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="font-display font-black text-cyan text-glow-cyan leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
        >
          {title.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-white/50 text-lg max-w-2xl mx-auto font-body leading-relaxed"
        >
          Live Web3 + AI Terminal — Not a demo. Not a mockup. Everything running.
        </p>

        <div ref={ctasRef} className="mt-10 flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() =>
              document.getElementById("market")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Launch Terminal
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Read Manifesto
          </Button>
        </div>
      </div>

      <HeroTicker />
    </section>
  );
}
