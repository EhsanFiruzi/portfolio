import Profile from "@/components/Profile";

import {  SkillsSection } from "@/components/skill-card"
import Contact from "@/components/Contact"
import ProjectsSection from "@/components/Projects";



export default function Home() {
  return (
    <>
        <Profile/>
        <div className="flex m-14">
          <SkillsSection />
        </div>
        <ProjectsSection/>
        <Contact/>
      {/* <main className="min-h-screen bg-background text-foreground">
      </main> */}
    </>
  );
}