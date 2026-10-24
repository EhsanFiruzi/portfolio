import { site } from "@/data/site"

export function Footer() {
  return (
    <footer className="relative z-10 border-t py-8">
      <div className="wrap flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}, {site.role}
        </p>
        <p>Built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  )
}
