import { site } from "@/data/site"

export function Footer() {
  return (
    <footer className="relative z-10 border-t py-8">
      <div className="wrap flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Built with Next.js, Tailwind and a lot of hot reloads.</p>
      </div>
    </footer>
  )
}
