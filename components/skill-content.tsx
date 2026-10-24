"use client"

import Image from "next/image"
import { Clock, FolderGit2, Sparkles } from "lucide-react"

import type { Skill, SkillLevel } from "@/types/skill"
import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset"
import { useInView } from "@/hooks/use-in-view"

const LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
}
const LEVEL_DOTS: Record<SkillLevel, number> = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }

/** محتوای بصریِ کارت اسکیل؛ افکت‌ها (ذرات، گلو، تیلت) توسط MagicBento میاد */
export function SkillContent({ skill }: { skill: Skill }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="flex h-full flex-col gap-4 p-5 sm:p-6" style={{ ["--skill-accent" as string]: skill.color }}>
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-(--skill-accent)/15">
          <Image
            src={asset(skill.icon)}
            alt=""
            width={30}
            height={30}
            className={cn("object-contain", skill.invertInDark && "dark:invert")}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold leading-tight">{skill.title}</h3>
            {skill.featured && <Sparkles className="size-3.5 shrink-0 text-(--skill-accent)" aria-label="Core skill" />}
          </div>
          <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">{skill.category}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{skill.description}</p>

      <div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Proficiency</span>
          <span className="font-semibold tabular-nums text-(--skill-accent)">{skill.proficiency}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-(--skill-accent) transition-[width] duration-1000 ease-out"
            style={{ width: inView ? `${skill.proficiency}%` : "0%" }}
          />
        </div>
      </div>

      {skill.tags && (
        <ul className="flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-foreground/5 px-2 py-1 text-[11px] font-medium text-foreground/70">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <i
                key={i}
                className={cn("size-1.5 rounded-full", i < LEVEL_DOTS[skill.level] ? "bg-(--skill-accent)" : "bg-foreground/15")}
              />
            ))}
          </span>
          <span className="font-medium">{LEVEL_LABEL[skill.level]}</span>
        </div>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? "yr" : "yrs"}
        </span>
      </div>
    </div>
  )
}
