import { HeroSection } from "@/components/sections/hero-section";
import { SkillSection } from "@/components/sections/skill-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/contact-section";
import PortfolioLanding from "@/components/PortfolioLanding";
import { Navbar } from "@/components/navbar";

export default function Home() { 
  return (
    <div className="">

      <div className="">
        <Navbar />
      </div>

      <div className="">
      <HeroSection />
      <SkillSection />
      {/* <SkillsSection /> */}
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
      </div>


    </div>
  );
}
