"use client"

import { useState } from "react"

import { skills, skillGroups } from "@/data/skills"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"
import MagicBento from "@/components/MagicBento"

export function SkillsSection() {
  const [group, setGroup] = useState<(typeof skillGroups)[number]["id"]>("all")
  const visible = group === "all" ? skills : skills.filter((s) => s.group === group)

  return (
    <section id="skills" className="relative z-10 scroll-mt-24 py-20">
      <div className="wrap">
        <SectionHeading
          title="Skills"
          description="The tools I reach for to take an idea from a sketch to the app store."
        />

        <div role="tablist" aria-label="Skill groups" className="mb-8 flex flex-wrap gap-2">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              role="tab"
              type="button"
              aria-selected={group === g.id}
              onClick={() => setGroup(g.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                group === g.id
                  ? "border-transparent bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* key باعث میشه با هر فیلتر، افکت‌ها از نو ساخته بشن */}
        <MagicBento key={group} skills={visible} />
      </div>
    </section>
  )
}
