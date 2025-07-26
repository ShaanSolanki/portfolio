import Hero from "@/components/hero";
import AboutMe from "@/components/aboutme";
import TechStack from "@/components/teckstack";
import Services from "@/components/services";
import Getintouch from "@/components/getintouch";

export default function Home() {
  return (
    <main className="relative z-30">
      <Hero />
      
      {/* About Section */}
      <section id="about" className="scroll-mt-20">
        <AboutMe />
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="scroll-mt-20">
        <TechStack />
      </section>
       <section id="services" className="scroll-mt-20">
        <Services />
      </section>
      
      
      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20">
        <Getintouch />
      </section>
    </main>
  );
}