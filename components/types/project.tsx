import { ReactNode } from "react"

export enum ProjectType {
  APP = "app",
  WEBSITE = "website",
}

export enum StoreType {
  MYKET = "myket",
  BAZAAR = "bazaar",
  GOOGLE_PLAY = "googlePlay",
}

export enum ProjectStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "inProgress",
  ARCHIVED = "archived",
}


export interface DownloadLink {
  /**
   * نوع فروشگاه
   */
  store: StoreType

  /**
   * لینک دانلود
   */
  url: string
}


export interface Project {
  /**
   * نام پروژه
   */
  title: string

  /**
   * توضیح کوتاه
   */
  description: string

  /**
   * بنر پروژه
   */
  banner: string

  /**
   * آیکون پروژه
   */
  icon: ReactNode

  /**
   * نوع پروژه
   */
  type: ProjectType

  /**
   * وضعیت پروژه
   */
  status?: ProjectStatus

  /**
   * تکنولوژی‌های استفاده شده
   */
  technologies: string[]

  /**
   * لینک‌های دانلود
   */
  downloadLinks: DownloadLink[]

  /**
   * لینک گیت‌هاب
   */
  githubUrl?: string

  /**
   * لینک دمو
   */
  liveDemoUrl?: string

  /**
   * اسکرین‌شات‌ها
   */
  screenshots: string[]

  /**
   * آیا پروژه شاخص است؟
   */
  featured: boolean

  /**
   * سال ساخت
   */
  year?: number
}