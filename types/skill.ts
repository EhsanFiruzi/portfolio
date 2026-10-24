export interface SkillItem {
  name: string
  icon?: string
  invertInDark?: boolean
  /** فقط اگه دقیق باشه */
  years?: number
  /** توضیح کوتاه، مثل «Currently learning» */
  note?: string
  /** slug پروژه‌هایی که این مهارت توشون استفاده شده (از data/projects.ts) */
  projects?: string[]
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  items: SkillItem[]
}
