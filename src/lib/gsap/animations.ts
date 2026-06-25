import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

export function initStaggerReveal(container: string, child: string) {
  gsap.utils.toArray<HTMLElement>(container).forEach((el) => {
    const children = el.querySelectorAll(child);
    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  });
}

export function initCounter(el: HTMLElement, target: number, prefix = "", suffix = "") {
  gsap.fromTo(
    el,
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      ease: "power2.out",
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      onUpdate() {
        el.innerText = `${prefix}${Number(gsap.getProperty(el, "innerText")).toLocaleString()}${suffix}`;
      },
    }
  );
}

export function initParallax(el: HTMLElement, speed: number) {
  gsap.to(el, {
    y: () => speed * ScrollTrigger.maxScroll(window) * 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
