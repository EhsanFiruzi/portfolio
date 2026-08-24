// components/skill-card.tsx
"use client"

import Image from "next/image"
import MagicBento from './MagicBento';

import { useEffect, useRef, useState } from "react"
import { Sparkles, Clock, FolderGit2 } from "lucide-react"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Skill, SkillLevel } from "@/components/types/skill"

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

export function SkillCard({ skill }: { skill: Skill }) {

  const [progress, setProgress] = useState(0)
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // پرشدن پراگرس بار وقتی کارت وارد viewport می‌شه
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // یک تیک تاخیر برای اینکه transition واقعا اجرا بشه
          requestAnimationFrame(() => setProgress(skill.proficiency))
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [skill.proficiency])

  const visibleTags = skill.tags ?? []
  const hasExtraTags = visibleTags.length > 3
  const shownTags = tagsExpanded ? visibleTags : visibleTags.slice(0, 3)
  const hiddenCount = visibleTags.length - 3

  return (
    <div
      ref={ref}
  style={
  {
    "--skill-accent": skill.color,
  } as React.CSSProperties
}
      className="group/skill relative"
    >
      <Card
        className={cn(
          "relative gap-4 overflow-visible p-3 pt-0 transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg hover:shadow-(--skill-accent)/10",
          skill.featured
            ? "ring-1 ring-(--skill-accent)/40"
            : "ring-1 ring-foreground/10"
        )}
      >

        <CardHeader className="px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12",
                "bg-(--skill-accent)/15 text-(--skill-accent)",
                "transition-transform duration-300 group-hover/skill:scale-105"
              )}
            >
              {skill.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-heading text-sm font-semibold leading-tight sm:text-base">
                  {skill.title}
                </h3>
                {skill.featured && (
                  <Sparkles
                    className="size-3.5 shrink-0 text-(--skill-accent)"
                    aria-label="Featured skill"
                  />
                )}
              </div>
              <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">
                {skill.category}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {skill.description}
          </p>

          {/* Proficiency */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                Proficiency
              </span>
              <span className="font-semibold text-(--skill-accent)">
                {skill.proficiency}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-(--skill-accent) transition-[width] duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Tags */}
          {visibleTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {shownTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-foreground/5 px-2 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {tag}
                </span>
              ))}

              {hasExtraTags && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setTagsExpanded((prev) => !prev)
                  }}
                  aria-expanded={tagsExpanded}
                  aria-label={
                    tagsExpanded
                      ? "Show fewer tags"
                      : `Show ${hiddenCount} more tags`
                  }
                  className={cn(
                    "flex min-h-8 items-center rounded-md px-2 py-1 text-[11px] font-semibold",
                    "bg-(--skill-accent)/10 text-(--skill-accent)",
                    "transition-colors hover:bg-(--skill-accent)/20",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--skill-accent)/50"
                  )}
                >
                  {tagsExpanded ? "Show less" : `+${hiddenCount}`}
                </button>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-foreground/10 px-4 pt-4 text-xs text-muted-foreground sm:px-5">
          <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-2">
            {/* Level dots */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "size-1.5 rounded-full",
                      i < LEVEL_DOTS[skill.level]
                        ? "bg-(--skill-accent)"
                        : "bg-foreground/15"
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{LEVEL_LABEL[skill.level]}</span>
            </div>

            <div className="flex items-center gap-3 sm:ml-auto">
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

const skills: Skill[] = [
  {
    title: "Flutter",
    description:
      "Build high-performance cross-platform mobile applications with Flutter and Dart.",
    icon: (
  <Image
    src="./flutter.svg"
    alt="Flutter"
    width={34}
    height={34}
    className="object-contain"
  />
),
    level: "expert",
    proficiency: 90,
    yearsOfExperience: 3,
    category: "Mobile Development",
    color: "#42A5F5",
    tags: ["Flutter", "Dart", "Riverpod", "State Management"],
    featured: true,
  },

  {
    title: "FastAPI",
    description:
      "Develop fast, scalable and modern REST APIs using FastAPI and Python.",
    icon: (
  <Image
    src="./fastapi.svg"
    alt="FastAPI"
    width={34}
    height={34}
    className="object-contain"
  />
),
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
    description:
      "Modern React framework for building fast, SEO-friendly web applications.",
    icon: (
  <Image
    src="./next.svg"
    alt="Next.js"
    width={34}
    height={34}
    className="object-contain dark:invert"
  />
),
    level: "beginner",
    proficiency: 30,
    yearsOfExperience: 1,
    category: "Web Development",
    color: "var(--next-accent)",// zinc-200,
    tags: ["React", "SSR", "App Router", "Tailwind CSS"],
  },

  {
    title: "SQL",
    description:
      "Design and write efficient SQL queries for relational databases.",
    icon: (
  <Image
    src="./sql.svg"
    alt="SQL"
    width={34}
    height={34}
    className="object-contain"
  />
),
    level: "advanced",
    proficiency: 85,
    yearsOfExperience: 4,
    category: "Database",
    color: "#4CAF50",
    tags: ["Joins", "Indexes", "Optimization", "Queries"],
  },

  {
    title: "PostgreSQL",
    description:
      "Work with PostgreSQL for scalable, reliable and production-ready databases.",
    icon: (
  <Image
    src="./postgresql.svg"
    alt="PostgreSQL"
    width={34}
    height={34}
    className="object-contain"
  />
),
    level: "advanced",
    proficiency: 80,
    yearsOfExperience: 3,
    category: "Database",
    color: "#336791",
    tags: ["PostgreSQL", "Database Design", "Performance", "SQL"],
  },

    {
    title: "Python",
    description:
      "Build backend services, APIs, automation tools, and asynchronous applications with Python.",
    icon: (
      <Image
        src="./python.svg"
        alt="Python"
        width={34}
        height={34}
        className="object-contain"
      />
    ),
    level: "expert",
    proficiency: 95,
    yearsOfExperience: 5,
    category: "Programming Language",
    color: "#306998",
    tags: ["Python", "FastAPI", "AsyncIO", "SQLAlchemy", "OOP", "Automation"],
    featured: true,
  },

  {
    title: "Python Telegram Bot",
    description:
      "Develop advanced Telegram bots with Python, Webhooks and the Telegram Bot API.",
    icon: (
  <Image
    src="./python-telegram-bot-logo.svg"
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

export function SkillsSection() {
  return (
    <section className="mt-10 w-full">
      <div className="mb-8 flex w-full flex-col items-center text-center">
        <h2 className="text-3xl font-bold">
          Skills
        </h2>

        <p className="mt-2 max-w-xl text-muted-foreground">
          Technologies and tools I use to build modern applications.
        </p>
      </div>

      <MagicBento />
    </section>
  )
}