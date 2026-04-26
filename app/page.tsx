import { HeroSection } from "@/components/sections/hero-section";
import { SkillSection } from "@/components/sections/skill-section";
import { ProjectsSection } from "@/components/sections/projects-section";

import { ContactSection } from "@/components/sections/contact-section";

import { Navbar } from "@/components/navbar";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export default function Home() { 
  return (
    <div className="">

      <div className="">
        <Navbar />
      </div>

      <div className="">
      <HeroSection />
      <SkillSection />
     
      <ProjectsSection />
      <ExperienceSection/>
      <ContactSection />
      </div>


    </div>
  );
}
