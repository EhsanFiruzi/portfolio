import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Plus_Jakarta_Sans, Vazirmatn } from "next/font/google"
import "./globals.css"

import { cn } from "@/lib/utils"
import { site } from "@/data/site"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// فونت اصلی سایت؛ برای عوضش فقط همین یه خط رو تغییر بده
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code" })
// برای متن فارسی مثل «قرص یاد»
const persian = Vazirmatn({ subsets: ["arabic"], variable: "--font-persian" })

const title = `${site.name} — ${site.role}`
const ogImage = `${site.url}/${site.avatar}`

export const metadata: Metadata = {
  title,
  description: site.headline,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    title,
    description: site.headline,
    url: `${site.url}/`,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: ogImage, alt: `Portrait of ${site.name}` }],
  },
  twitter: { card: "summary", title, description: site.headline, images: [ogImage] },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1020" },
    { media: "(prefers-color-scheme: light)", color: "#fafaff" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(jakarta.variable, code.variable, persian.variable)}
    >
      <body className="min-h-dvh">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded-md bg-signal px-4 py-2 text-sm font-semibold text-signal-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
