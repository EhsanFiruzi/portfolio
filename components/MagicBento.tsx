"use client"

import Image from "next/image"
import { useRef, useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"
import { Sparkles, Clock, FolderGit2 } from "lucide-react"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Skill, SkillLevel } from "@/components/types/skill"

import "./MagicBento.css"

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = "132, 0, 255" // fallback رنگ گلو (rgb به‌صورت رشته)
const MOBILE_BREAKPOINT = 768

const LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
}

const LEVEL_DOTS: Record<SkillLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
}

function formatYears(y: number) {
  return Number.isInteger(y) ? `${y}` : y.toFixed(1)
}

// تبدیل رنگ هگز کارت (مثل #42A5F5) به فرمت "r, g, b" برای استفاده در rgba() داخل CSS
// اگر رنگ هگز نبود (مثلا var(--next-accent))، به رنگ پیش‌فرض فال‌بک می‌کنیم
function hexToRgbString(color: string): string {
  const hex = color.trim()
  const match = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.exec(hex)
  if (!match) return DEFAULT_GLOW_COLOR

  let c = match[1]
  if (c.length === 3) {
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("")
  }

  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div")
  el.className = "particle"
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
})

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect()
  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty("--glow-x", `${relativeX}%`)
  card.style.setProperty("--glow-y", `${relativeY}%`)
  card.style.setProperty("--glow-intensity", glow.toString())
  card.style.setProperty("--glow-radius", `${radius}px`)
}

/* -------------------------------------------------------------------------- */
/* ParticleCard: کانتینر افکت‌دار (ذرات، تیلت، مگنتیسم، ریپل کلیک)              */
/* -------------------------------------------------------------------------- */

interface ParticleCardProps {
  children: React.ReactNode
  className?: string
  disableAnimations?: boolean
  style?: React.CSSProperties
  particleCount?: number
  glowColor?: string
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
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
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

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
    magnetismAnimationRef.current?.kill()

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        },
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return

    if (!particlesInitialized.current) {
      initializeParticles()
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
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

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        })
      }, index * 100)

      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        })
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        })
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05
        const magnetY = (y - centerY) * 0.05

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )

      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `

      element.appendChild(ripple)

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      )
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("click", handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("click", handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: "relative" }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* GlobalSpotlight                                                            */
/* -------------------------------------------------------------------------- */

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>
  disableAnimations?: boolean
  enabled?: boolean
  spotlightRadius?: number
  glowColor?: string
}

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const isInsideSection = useRef(false)

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return

    const spotlight = document.createElement("div")
    spotlight.className = "global-spotlight"
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return

      const section = gridRef.current.closest(".bento-section")
      const rect = section?.getBoundingClientRect()
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      isInsideSection.current = mouseInside || false
      const cards = gridRef.current.querySelectorAll<HTMLElement>(".magic-bento-card")

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0")
        })
        return
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
      let minDistance = Infinity

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2
        const effectiveDistance = Math.max(0, distance)

        minDistance = Math.min(minDistance, effectiveDistance)

        let glowIntensity = 0
        if (effectiveDistance <= proximity) {
          glowIntensity = 1
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
        }

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius)
      })

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      isInsideSection.current = false
      gridRef.current?.querySelectorAll<HTMLElement>(".magic-bento-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0")
      })
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current)
    }
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor])

  return null
}

const BentoCardGrid = ({
  children,
  gridRef,
}: {
  children: React.ReactNode
  gridRef: React.RefObject<HTMLDivElement | null>
}) => (
  <div className="bento-section grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4" ref={gridRef}>
    {children}
  </div>
)

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

/* -------------------------------------------------------------------------- */
/* محتوای بصری خودِ کارت اسکیل (دیزاین تو) که داخل ParticleCard رندر می‌شود      */
/* -------------------------------------------------------------------------- */

function SkillCardContent({ skill }: { skill: Skill }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // پرشدن پراگرس بار وقتی کارت وارد viewport می‌شه
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setProgress(skill.proficiency))
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [skill.proficiency])

  return (
    <div ref={ref} className="group/skill h-full">
      <Card
        className={cn(
          "relative flex h-full flex-col gap-4 overflow-visible border-0 bg-transparent p-3 pt-0 shadow-none",
          skill.featured
            ? "ring-1 ring-(--skill-accent)/40"
            : "ring-1 ring-foreground/10"
        )}
      >
        <CardHeader className="px-5 pt-5">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                "bg-(--skill-accent)/15 text-(--skill-accent)",
                "transition-transform duration-300 group-hover/skill:scale-105"
              )}
            >
              {skill.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-heading text-base font-semibold leading-tight">
                  {skill.title}
                </h3>
                {skill.featured && (
                  <Sparkles className="size-3.5 shrink-0 text-(--skill-accent)" aria-label="Featured skill" />
                )}
              </div>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">{skill.category}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 px-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">Proficiency</span>
              <span className="font-semibold text-(--skill-accent)">{skill.proficiency}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-(--skill-accent) transition-[width] duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {skill.tags && skill.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skill.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-foreground/5 px-2 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {tag}
                </span>
              ))}
              {skill.tags.length > 3 && (
                <span className="rounded-md bg-(--skill-accent)/10 px-2 py-1 text-[11px] font-semibold text-(--skill-accent)">
                  +{skill.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-foreground/10 px-5 pt-4 text-xs text-muted-foreground">
          <div className="flex w-full items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "size-1.5 rounded-full",
                      i < LEVEL_DOTS[skill.level] ? "bg-(--skill-accent)" : "bg-foreground/15"
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{LEVEL_LABEL[skill.level]}</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="size-3.5" />
                <span>{formatYears(skill.yearsOfExperience)} yrs</span>
              </div>
              {skill.projects && skill.projects.length > 0 && (
                <div className="flex items-center gap-1">
                  <FolderGit2 className="size-3.5" />
                  <span>{skill.projects.length}</span>
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* دیتای اسکیل‌ها (همون دیتای خودت — می‌تونی به‌جاش prop بدی)                     */
/* -------------------------------------------------------------------------- */

const defaultSkills: Skill[] = [
  {
    title: "Flutter",
    description: "Build high-performance cross-platform mobile applications with Flutter and Dart.",
    icon: <Image src="/flutter.svg" alt="Flutter" width={34} height={34} className="object-contain" />,
    level: "expert",
    proficiency: 90,
    yearsOfExperience: 3,
    category: "Mobile Development",
    color: "#42A5F5",
    tags: ["Flutter", "Dart", "Riverpod", "Firebase"],
    featured: true,
  },
  {
    title: "FastAPI",
    description: "Develop fast, scalable and modern REST APIs using FastAPI and Python.",
    icon: <Image src="/fastapi.svg" alt="FastAPI" width={34} height={34} className="object-contain" />,
    level: "expert",
    proficiency: 95,
    yearsOfExperience: 2,
    category: "Backend Development",
    color: "#009688",
    tags: ["Python", "REST API", "SQLAlchemy", "JWT"],
    featured: true,
  },
  {
    title: "Next.js",
    description: "Modern React framework for building fast, SEO-friendly web applications.",
    icon: <Image src="/next.svg" alt="Next.js" width={34} height={34} className="object-contain dark:invert" />,
    level: "beginner",
    proficiency: 30,
    yearsOfExperience: 1,
    category: "Web Development",
    color: "#71717A",
    tags: ["React", "SSR", "App Router", "Tailwind CSS"],
  },
  {
    title: "SQL",
    description: "Design and write efficient SQL queries for relational databases.",
    icon: <Image src="/sql.svg" alt="SQL" width={34} height={34} className="object-contain" />,
    level: "advanced",
    proficiency: 85,
    yearsOfExperience: 4,
    category: "Database",
    color: "#4CAF50",
    tags: ["Joins", "Indexes", "Optimization", "Queries"],
  },
  {
    title: "PostgreSQL",
    description: "Work with PostgreSQL for scalable, reliable and production-ready databases.",
    icon: <Image src="/postgresql.svg" alt="PostgreSQL" width={34} height={34} className="object-contain" />,
    level: "advanced",
    proficiency: 80,
    yearsOfExperience: 3,
    category: "Database",
    color: "#336791",
    tags: ["PostgreSQL", "Database Design", "Performance", "SQL"],
  },
  {
    title: "Python",
    description: "Write clean, maintainable and efficient software with Python.",
    icon: <Image src="/python.svg" alt="Python" width={34} height={34} className="object-contain" />,
    level: "expert",
    proficiency: 100,
    yearsOfExperience: 5,
    category: "Programming Language",
    color: "#306998",
    tags: ["Python", "AsyncIO", "OOP", "Automation"],
    featured: true,
  },
  {
    title: "Python Telegram Bot",
    description: "Develop advanced Telegram bots with Python, Webhooks and the Telegram Bot API.",
    icon: (
      <Image
        src="/python-telegram-bot-logo.svg"
        alt="Python Telegram Bot"
        width={34}
        height={34}
        className="object-contain"
      />
    ),
    level: "expert",
    proficiency: 90,
    yearsOfExperience: 2,
    category: "Bot Development",
    color: "#0088CC",
    tags: ["Telegram API", "python-telegram-bot", "Webhooks", "AsyncIO"],
    featured: true,
  },
]

/* -------------------------------------------------------------------------- */
/* MagicBento اصلی                                                            */
/* -------------------------------------------------------------------------- */

interface MagicBentoProps {
  skills?: Skill[]
  textAutoHide?: boolean
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

const MagicBento = ({
  skills = defaultSkills,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = false,
}: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()
  const shouldDisableAnimations = disableAnimations || isMobile

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={DEFAULT_GLOW_COLOR}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {skills.map((skill) => {
          const skillGlow = hexToRgbString(skill.color)
          const baseClassName = cn(
            "magic-bento-card h-full",
            enableBorderGlow && "magic-bento-card--border-glow"
          )
          const cardStyle: React.CSSProperties = {
            "--glow-color": skillGlow,
            "--skill-accent": skill.color,
          } as React.CSSProperties

          if (enableStars) {
            return (
              <ParticleCard
                key={skill.title}
                className={baseClassName}
                style={cardStyle}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={skillGlow}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <SkillCardContent skill={skill} />
              </ParticleCard>
            )
          }

          return (
            <div key={skill.title} className={baseClassName} style={cardStyle}>
              <SkillCardContent skill={skill} />
            </div>
          )
        })}
      </BentoCardGrid>
    </>
  )
}

export default MagicBento