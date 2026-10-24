import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "goalproof",
    title: "GoalProof",
    description: "A goal tracking app.",
    icon: "goal_proof_logo.png",
    banner: "goal_proof_banner.png", // اگه نخوای، این خط رو پاک کن؛ کاور خودکار ساخته میشه
    accent: "#7C5CFF",
    type: "app",
    technologies: ["Flutter", "Dart", "MVVM", "shadcn UI"],
    downloads: [{ store: "myket", url: "https://myket.ir/app/ir.ehsan.goalproof" }],
    featured: true,
    liveDemoUrl: "https://ehsanfiruzi.github.io/goalproof_web/fa/",
    year: 2026,
  },
  {
    slug: "ghors-yad",
    title: "قرص یاد",
    description: "A medicine reminder app.",
    icon: "ghors_yad_logo.png",
    banner: "ghors_yad_banner.jpg",
    accent: "#14B8A6",
    type: "app",
    technologies: ["Flutter", "Dart", "MVVM"],
    downloads: [
      { store: "myket", url: "https://myket.ir/app/ir.ehsan.ghorsyad" },
      { store: "bazaar", url: "https://cafebazaar.ir/app/ir.ehsan.ghorsyad" },
    ],
    featured: true,
    year: 2025,
  },
]
