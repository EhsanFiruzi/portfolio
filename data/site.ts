interface Site {
  name: string
  shortName: string
  role: string
  headline: string
  intro: string
  avatar: string
  /** آدرس تولید (GitHub Pages) برای canonical و Open Graph */
  url: string
  coreStack: string[]
  /** TODO: ایمیل واقعی‌ات رو اینجا بذار تا دکمه‌ی Email نمایش داده بشه */
  email?: string
  /** TODO: فایل رزومه رو تو public بذار (مثلاً "resume.pdf") و اسمش رو اینجا بنویس */
  resume?: string
}

export const site: Site = {
  name: "Ehsan Firuzi",
  shortName: "Ehsan",
  role: "Mobile & Backend Developer",
  headline: "I build and ship Flutter apps and FastAPI backends, from product idea to production.",
  intro:
    "I implement the whole product: the Flutter client, the Python backend, and the store release. My apps are bilingual, with full right-to-left support for Persian.",
  avatar: "profile.jpg",
  url: "https://ehsanfiruzi.github.io/portfolio",
  coreStack: ["Flutter", "Dart", "Python", "FastAPI"],
  email: "ijaeyung1286@gmail.com",
  resume: undefined,

}

export interface Contact {
  title: string
  /** متن اکشن، واضح و قابل فهم */
  label: string
  handle: string
  href: string
  icon: string
  invertInDark?: boolean
}

// ترتیب = اولویت نمایش
export const contacts: Contact[] = [
  {
    title: "LinkedIn",
    label: "Connect on LinkedIn",
    handle: "ehsan-firuzi",
    href: "https://www.linkedin.com/in/ehsan-firuzi-635721384",
    icon: "linkedin.svg",
  },
  {
    title: "GitHub",
    label: "View GitHub profile",
    handle: "EhsanFiruzi",
    href: "https://github.com/EhsanFiruzi",
    icon: "github.svg",
    invertInDark: true,
  },
  {
    title: "Telegram",
    label: "Message on Telegram",
    handle: "@Ehsan_Firuzi",
    href: "https://t.me/Ehsan_Firuzi",
    icon: "telegram.svg",
  },
  {
    title: "Instagram",
    label: "Follow on Instagram",
    handle: "@ehsan_fullstack",
    href: "https://www.instagram.com/ehsan_fullstack?igsh=bTJrb2hobzQyMGU3",
    icon: "instagram.svg",
  },
]
