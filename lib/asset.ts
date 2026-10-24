const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * مسیر فایل‌های داخل /public رو با basePath (برای GitHub Pages) درست می‌کنه.
 * asset("flutter.svg") یا asset("./flutter.svg") → "/portfolio/flutter.svg"
 */
export function asset(path: string) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path
  return `${BASE}/${path.replace(/^\.?\/+/, "")}`
}
