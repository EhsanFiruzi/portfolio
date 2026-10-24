import type { NextConfig } from "next"

// GitHub Pages: https://EhsanFiruzi.github.io/portfolio  →  basePath = "/portfolio"
// اگر دامنه‌ی اختصاصی گذاشتی، basePath رو خالی کن.
const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true, // asset() برای صفحه‌های تو در تو به این وابسته‌ست
  images: { unoptimized: true },
}

export default nextConfig
