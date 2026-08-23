import Profile from "@/components/Profile";

import {  SkillsSection } from "@/components/skill-card"
import Contact from "@/components/Contact"
import ProjectsSection from "@/components/Projects";



export default function Home() {
  return (
    <>
        <Profile/>
        <div className="px-4 py-10 sm:flex sm:m-14 sm:px-0 sm:py-0">
          <SkillsSection />
        </div>
        <ProjectsSection/>
        <Contact/>
      {/* <main className="min-h-screen bg-background text-foreground">
      </main> */}
    </>
  );
}