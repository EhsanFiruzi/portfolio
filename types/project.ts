export type ProjectType = "app" | "website"
export type StoreId = "myket" | "bazaar" | "googlePlay"
export type ProjectStatus = "published" | "in-progress"

export interface DownloadLink {
  store: StoreId
  url: string
}

export interface Decision {
  title: string
  body: string
}

export interface Screenshot {
  /** مسیر داخل public */
  src: string
  alt: string
}

/**
 * محتوای صفحه‌ی case study. فقط فیلدهایی که واقعاً مستند هستن پر بشن؛
 * فیلد خالی = اون بخش اصلاً نمایش داده نمیشه.
 */
export interface CaseStudy {
  overview: string
  audience?: string
  problem?: string
  features?: string[]
  role?: string[]
  architecture?: string[]
  decisions?: Decision[]
  outcomes?: string[]
  screenshots?: Screenshot[]
}

export interface Project {
  slug: string
  title: string
  /** زبان عنوان اگه انگلیسی نیست (برای نمایش و screen reader) */
  titleLang?: "fa"
  /** یک یا دو جمله برای کارت و متادیتا */
  summary: string
  icon: string
  banner?: string
  accent: string
  type: ProjectType
  status: ProjectStatus
  platform?: string
  year?: number
  /** تکنولوژی‌های خودِ محصول */
  technologies: string[]
  /** تکنولوژی‌های وب‌سایت/دموی جدا (اگه محصول وب داره) */
  webTechnologies?: string[]
  downloads: DownloadLink[]
  githubUrl?: string
  /** دموی آنلاین و قابل استفاده از خود محصول */
  liveDemoUrl?: string
  /** وب‌سایت معرفی محصول (لندینگ)؛ لزوماً دمو نیست */
  websiteUrl?: string
  featured?: boolean
  caseStudy: CaseStudy
}
