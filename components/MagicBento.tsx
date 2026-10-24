"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

import type { Skill } from "@/types/skill"
import { cn } from "@/lib/utils"
import { SkillContent } from "@/components/skill-content"

import "./MagicBento.css"

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = "132, 0, 255"
const NEUTRAL_GLOW = "150, 155, 190" // برای رنگ‌هایی مثل var(--next-accent) که هگز نیستن
const MOBILE_BREAKPOINT = 768

// "#42A5F5" → "66, 165, 245"
function toRgbString(color: string): string {
  const match = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.exec(color.trim())
  if (!match) return NEUTRAL_GLOW
  let c = match[1]
  if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("")
  return `${parseInt(c.slice(0, 2), 16)}, ${parseInt(c.slice(2, 4), 16)}, ${parseInt(c.slice(4, 6), 16)}`
}

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement("div")
  el.className = "particle"
  el.style.cssText = `
    position:absolute;width:4px;height:4px;border-radius:50%;
    background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);
    pointer-events:none;z-index:100;left:${x}px;top:${y}px;
  `
  return el
}

const updateCardGlowProperties = (card: HTMLElement, mx: number, my: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect()
  card.style.setProperty("--glow-x", `${((mx - rect.left) / rect.width) * 100}%`)
  card.style.setProperty("--glow-y", `${((my - rect.top) / rect.height) * 100}%`)
  card.style.setProperty("--glow-intensity", glow.toString())
  card.style.setProperty("--glow-radius", `${radius}px`)
}

/* ------------------------------ ParticleCard ------------------------------ */

interface ParticleCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  disableAnimations?: boolean
  particleCount?: number
  glowColor: string
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const ParticleCard = ({
  children,
  className,
  style,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)
  const magnetismRef = useRef<gsap.core.Tween | null>(null)

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetismRef.current?.kill()
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return
    if (!particlesInitialized.current) initializeParticles()

    memoizedParticles.current.forEach((particle, index) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        })
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true })
      }, index * 100)
      timeoutsRef.current.push(id)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return
    const el = cardRef.current

    const onEnter = () => {
      isHoveredRef.current = true
      animateParticles()
      if (enableTilt) {
        gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: "power2.out", transformPerspective: 1000 })
      }
    }

    const onLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" })
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" })
    }

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2

      if (enableTilt) {
        gsap.to(el, {
          rotateX: ((y - cy) / cy) * -10,
          rotateY: ((x - cx) / cx) * 10,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        })
      }
      if (enableMagnetism) {
        magnetismRef.current = gsap.to(el, {
          x: (x - cx) * 0.05,
          y: (y - cy) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxD = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )
      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;
        background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);
        left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;
      `
      el.appendChild(ripple)
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() }
      )
    }

    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    el.addEventListener("mousemove", onMove)
    el.addEventListener("click", onClick)

    return () => {
      isHoveredRef.current = false
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("click", onClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div ref={cardRef} className={cn(className, "particle-container")} style={{ ...style, position: "relative" }}>
      {children}
    </div>
  )
}

/* ------------------------------ GlobalSpotlight ------------------------------ */

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>
  disableAnimations?: boolean
  spotlightRadius?: number
}

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
}: GlobalSpotlightProps) => {
  useEffect(() => {
    if (disableAnimations || !gridRef.current) return
    const grid = gridRef.current

    const spotlight = document.createElement("div")
    spotlight.className = "global-spotlight"
    spotlight.style.cssText = `
      position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,
        rgba(${DEFAULT_GLOW_COLOR},0.15) 0%,rgba(${DEFAULT_GLOW_COLOR},0.08) 15%,
        rgba(${DEFAULT_GLOW_COLOR},0.04) 25%,rgba(${DEFAULT_GLOW_COLOR},0.02) 40%,
        rgba(${DEFAULT_GLOW_COLOR},0.01) 65%,transparent 70%);
      opacity:0;transform:translate(-50%,-50%);
    `
    document.body.appendChild(spotlight)

    const proximity = spotlightRadius * 0.5
    const fadeDistance = spotlightRadius * 0.75

    const onMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect()
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      const cards = grid.querySelectorAll<HTMLElement>(".magic-bento-card")

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" })
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"))
        return
      }

      let minDistance = Infinity
      cards.forEach((card) => {
        const r = card.getBoundingClientRect()
        const d = Math.max(
          0,
          Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) - Math.max(r.width, r.height) / 2
        )
        minDistance = Math.min(minDistance, d)

        let glow = 0
        if (d <= proximity) glow = 1
        else if (d <= fadeDistance) glow = (fadeDistance - d) / (fadeDistance - proximity)
        updateCardGlowProperties(card, e.clientX, e.clientY, glow, spotlightRadius)
      })

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" })
      const target =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0
      gsap.to(spotlight, { opacity: target, duration: target > 0 ? 0.2 : 0.5, ease: "power2.out" })
    }

    const onLeave = () => {
      grid.querySelectorAll<HTMLElement>(".magic-bento-card").forEach((c) => c.style.setProperty("--glow-intensity", "0"))
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" })
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      spotlight.remove()
    }
  }, [gridRef, disableAnimations, spotlightRadius])

  return null
}

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

/* ------------------------------ MagicBento ------------------------------ */

interface MagicBentoProps {
  skills: Skill[]
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
}

export default function MagicBento({
  skills,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = false,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()
  const noAnim = disableAnimations || isMobile

  return (
    <>
      {enableSpotlight && <GlobalSpotlight gridRef={gridRef} disableAnimations={noAnim} spotlightRadius={spotlightRadius} />}

      <div ref={gridRef} className="bento-section grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => {
          const glow = toRgbString(skill.color)
          const className = cn("magic-bento-card h-full w-full", enableBorderGlow && "magic-bento-card--border-glow")
          const style = { "--glow-color": glow } as React.CSSProperties

          return enableStars ? (
            <ParticleCard
              key={skill.title}
              className={className}
              style={style}
              disableAnimations={noAnim}
              particleCount={particleCount}
              glowColor={glow}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              <SkillContent skill={skill} />
            </ParticleCard>
          ) : (
            <div key={skill.title} className={className} style={style}>
              <SkillContent skill={skill} />
            </div>
          )
        })}
      </div>
    </>
  )
}
