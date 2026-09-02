import { PROFILE } from "./data/profile";
import { HERO_STATS } from "./data/stats";
import { WORK_SUBTITLE } from "./data/experience";
import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import { Grain } from "./components/common/Grain";
import { CursorFollower } from "./components/common/CursorFollower";
import { PillNav } from "./components/layout/PillNav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/projects/Projects";
import { Contact } from "./components/sections/Contact";

export default function App() {
  useTheme("dark");
  useReveal();

  return (
    <>
      <Grain />
      <CursorFollower />
      <PillNav profile={PROFILE} cta="Let's talk" />
      <Hero profile={PROFILE} cards={HERO_STATS} headline="Software at Scale." />
      <About />
      <Experience workSubtitle={WORK_SUBTITLE} highlightCount={11} />
      <Skills />
      <Projects />
      <Contact profile={PROFILE} />
      <Footer />
    </>
  );
}
