/**
 * مسیر فایل‌های داخل /public رو نسبی می‌سازه تا روی GitHub Pages (زیرمسیر /portfolio) هم کار کنه.
 *
 *  asset("flutter.svg")        → "./flutter.svg"      (صفحه‌ی اصلی: /)
 *  asset("flutter.svg", 2)     → "../../flutter.svg"  (صفحه‌ی پروژه: /projects/[slug]/)
 *
 * depth = تعداد پوشه‌های بین ریشه و صفحه‌ی فعلی (با trailingSlash: true).
 */
export function asset(path: string, depth = 0) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path
  const clean = path.replace(/^\.?\/+/, "")
  return `${depth === 0 ? "./" : "../".repeat(depth)}${clean}`
}
