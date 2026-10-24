"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { site } from "@/data/site"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export function Navbar() {
  const [active, setActive] = useState("home")

  // اسکرول‌اسپای: لینکی که سکشنش وسط صفحه‌ست فعال میشه
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-full border bg-background/70 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        <Link
          href="/#home"
          className="hidden items-center gap-2 pl-3 pr-2 font-heading text-sm font-semibold sm:flex"
        >
          <span className="size-2 rounded-full bg-signal" />
          {site.shortName}
        </Link>

        <ul className="flex items-center">
          {NAV.map((link) => (
            <li key={link.id}>
              <Link
                href={`/#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "block rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm",
                  active === link.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  )
}
