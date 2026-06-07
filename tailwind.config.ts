import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050505",
          secondary: "#0a0a0a",
          card: "rgba(255,255,255,0.03)",
          cardHover: "rgba(255,255,255,0.06)",
        },
        accent: {
          primary: "#00d4ff",
          secondary: "#7c3aed",
          tertiary: "#ff3d00",
        },
        text: {
          primary: "#ffffff",
          secondary: "rgba(255,255,255,0.7)",
          muted: "rgba(255,255,255,0.4)",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          default: "rgba(255,255,255,0.1)",
          accent: "rgba(0,212,255,0.3)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Syne", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "scan-line": "scanLine 4s linear infinite",
        "particle-float": "particleFloat 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,212,255,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        particleFloat: {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.3" },
          "25%": { transform: "translate(10px, -20px)", opacity: "0.6" },
          "50%": { transform: "translate(-5px, -40px)", opacity: "0.4" },
          "75%": { transform: "translate(15px, -20px)", opacity: "0.7" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,212,255,0.15)",
        "glow-lg": "0 0 40px rgba(0,212,255,0.25)",
        "glow-accent": "0 0 20px rgba(124,58,237,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
}

export default config
