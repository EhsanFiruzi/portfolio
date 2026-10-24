export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert"
export type SkillGroup = "mobile" | "backend" | "web" | "data"

export interface Skill {
  title: string
  description: string
  /** مسیر آیکون داخل public */
  icon: string
  invertInDark?: boolean
  level: SkillLevel
  proficiency: number // 0..100
  yearsOfExperience: number
  category: string
  group: SkillGroup
  /** هر رنگ CSS معتبر (hex یا var(...)) */
  color: string
  tags?: string[]
  featured?: boolean
}
