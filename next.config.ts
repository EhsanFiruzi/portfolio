import type { NextConfig } from "next"

// GitHub Pages: https://EhsanFiruzi.github.io/portfolio  →  basePath = "/portfolio"
// اگر دامنه‌ی اختصاصی گذاشتی، basePath رو خالی کن.
const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
