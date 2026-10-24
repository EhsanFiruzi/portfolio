export type ProjectType = "app" | "website"
export type StoreId = "myket" | "bazaar" | "googlePlay"

export interface DownloadLink {
  store: StoreId
  url: string
}

export interface Project {
  slug: string
  title: string
  description: string
  /** لوگوی پروژه (مسیر داخل public) */
  icon: string
  /** اختیاری؛ اگر نباشه، کاور به‌صورت خودکار از accent ساخته میشه */
  banner?: string
  /** رنگ برند پروژه؛ کاور، گلو و هاور از همین میاد */
  accent: string
  type: ProjectType
  technologies: string[]
  downloads: DownloadLink[]
  githubUrl?: string
  liveDemoUrl?: string
  featured?: boolean
  year?: number
}
