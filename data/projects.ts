import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "goalproof",
    title: "GoalProof",
    summary:
      "Goal and habit tracker with streaks, badges and progress charts. Bilingual in Persian and English, built with Flutter.",
    icon: "goal_proof_logo.png",
    banner: "goal_proof_banner.png",
    accent: "#7C5CFF",
    type: "app",
    status: "published",
    platform: "Android",
    year: 2026,
    websiteUrl: "https://ehsanfiruzi.github.io/goalproof_web/fa/",
    technologies: ["Flutter", "Dart", "Riverpod", "Isar", "MVVM", "shadcn UI"],
    downloads: [{ store: "myket", url: "https://myket.ir/app/ir.ehsan.goalproof" }],
    featured: true,
    caseStudy: {
      overview:
        "GoalProof helps people keep track of their goals and stay consistent. They log progress, build streaks, unlock badges and review how they are doing in charts.",
      audience: "Persian- and English-speaking users who want a simple way to build habits and follow through on goals.",
      features: [
        "Streaks and a badge system that rewards consistency",
        "Progress page with bar, pie and line charts and date-range filters",
        "Swipeable stack of goal cards on the home screen",
        "Shareable progress cards, including a heatmap for premium users",
        "Premium tier through Myket in-app purchases",
        "Local notifications for reminders",
        "Full Persian and English localization with right-to-left layouts",
      ],
      role: [
        "Built the Flutter application end to end",
        "Implemented state management, the local data layer and localization",
        "Integrated Myket in-app purchases, including purchase and restore flows",
        "Prepared and published the app on Myket",
      ],
      architecture: [
        "MVVM structure on the client",
        "Riverpod for state management, with an AsyncNotifier holding premium status",
        "Isar as the local database",
        "ARB files for Persian and English strings",
      ],
      decisions: [
        {
          title: "Premium status that works offline",
          body: "Premium status is cached in SharedPreferences, so premium features keep working without a connection. It is refreshed when the store can be reached.",
        },
        {
          title: "Charts in a right-to-left app",
          body: "In the Persian layout the charts were mirrored. I wrapped them in a left-to-right Directionality so axes and values stay correct in both languages.",
        },
        {
          title: "Reliable reminders on Android",
          body: "Scheduled notifications were unreliable on some devices. Declaring the notification receivers explicitly in AndroidManifest.xml fixed it, and alarm-style alerts run on AlarmManager with a foreground service.",
        },
        {
          title: "Badge artwork under Impeller",
          body: "Some SVG badges rendered incorrectly with Impeller. I flattened the gradient inheritance in the SVG files so they render the same everywhere.",
        },
      ],
    },
  },
  {
    slug: "ghors-yad",
    title: "قرص یاد",
    titleLang: "fa",
    summary: "Medicine reminder app for Android, built with Flutter and published on Myket and Cafe Bazaar.",
    icon: "ghors_yad_logo.png",
    banner: "ghors_yad_banner.jpg",
    accent: "#14B8A6",
    type: "app",
    status: "published",
    platform: "Android",
    year: 2025,
    technologies: ["Flutter", "Dart", "MVVM"],
    downloads: [
      { store: "myket", url: "https://myket.ir/app/ir.ehsan.ghorsyad" },
      { store: "bazaar", url: "https://cafebazaar.ir/app/ir.ehsan.ghorsyad" },
    ],
    featured: true,
    caseStudy: {
      overview:
        "قرص یاد (Ghors Yad) is a medicine reminder app. I built it with Flutter and published it on Myket and Cafe Bazaar.",
      role: ["Built the Flutter application", "Published the app on Myket and Cafe Bazaar"],
      architecture: ["MVVM structure on the client"],
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
