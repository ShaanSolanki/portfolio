import Hero from "@/components/hero";
import AboutMe from "@/components/aboutme";
import TechStack from "@/components/teckstack";
import Services from "@/components/services";
import Getintouch from "@/components/getintouch";

export default function Home() {
  return (
    <main className="relative z-30"> {/* Fixed: Changed from z-10 to z-30 */}
      <Hero />
      <AboutMe />

      <TechStack />
      <Services />
      <Getintouch />
    </main>
  );
}

