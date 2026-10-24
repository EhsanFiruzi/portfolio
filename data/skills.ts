import type { SkillGroup } from "@/types/skill"

/**
 * گروه‌بندی بر اساس کاری که می‌تونم تحویل بدم، نه درصد.
 * projects: slug پروژه‌هایی که استفاده از اون مهارت توشون قابل بررسیه.
 * years / note فقط وقتی دقیق هستن.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform apps with Flutter, from architecture to store release.",
    items: [
      { name: "Flutter", icon: "flutter.svg", years: 3, projects: ["goalproof", "ghors-yad"] },
      { name: "Dart", projects: ["goalproof", "ghors-yad"] },
      { name: "Riverpod", projects: ["goalproof"] },
      { name: "MVVM", projects: ["goalproof", "ghors-yad"] },
      { name: "Isar", projects: ["goalproof"] },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, automation and bots in Python.",
    items: [
      { name: "Python", icon: "python.svg", years: 5 },
      { name: "FastAPI", icon: "fastapi.svg", years: 2 },
      { name: "SQLAlchemy" },
      { name: "Telegram bots", icon: "python-telegram-bot-logo.svg", years: 2, note: "python-telegram-bot, webhooks" },
    ],
  },
  {
    id: "data",
    title: "Databases",
    description: "Relational data modelling and queries.",
    items: [
      { name: "PostgreSQL", icon: "postgresql.svg", years: 3 },
      { name: "SQL", icon: "sql.svg", years: 4 },
    ],
  },
  {
    id: "web",
    title: "Web",
    description: "Currently growing here. This portfolio is built with the same stack.",
    items: [
      { name: "Next.js", icon: "next.svg", invertInDark: true, note: "Learning" },
      { name: "React" },
      { name: "Tailwind CSS" },
    ],
  },
]
