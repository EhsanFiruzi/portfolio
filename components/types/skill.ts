// types/skill.ts
import type { ReactNode } from "react"

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert"

export interface Skill {
  title: string
  description: string
  icon: ReactNode
  level: SkillLevel
  proficiency: number // 0..100
  yearsOfExperience: number
  category: string
  color: string // hex, e.g. "#02569B"
  tags?: string[]
  projects?: string[]
  featured?: boolean
}