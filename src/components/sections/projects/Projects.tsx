import { useEffect, useRef, useState } from "react";
import { PROJECTS, PROJECT_HUES } from "../../../data/projects";
import { SectionHead } from "../../common/SectionHead";
import { ProjectCard } from "./ProjectCard";
import "./Projects.css";

const hueFor = (i: number) => PROJECT_HUES[i % PROJECT_HUES.length];

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const closeT = useRef<number | undefined>(undefined);

  const activate = (i: number) => {
    clearTimeout(closeT.current);
    setActive(i);
  };
  const scheduleClose = () => {
    clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setActive(null), 180);
  };
  const close = () => {
    clearTimeout(closeT.current);
    setActive(null);
  };

  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="section" id="projects">
      <div className="shell">
        <SectionHead
          num="/04"
          label="Side work"
          title={
            <>
              Things I've <span className="em">built</span> on the side.
            </>
          }
          sub="Apps, APIs and oddments - some shipped to half a million users, some just for fun. Hover any card for a closer look."
        />
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              hue={hueFor(i)}
              active={active === i}
              onActivate={() => activate(i)}
              onScheduleClose={scheduleClose}
              onClose={close}
            />
          ))}
        </div>
      </div>

      <div
        className={"proj-dim" + (active != null ? " in" : "")}
        onClick={close}
        aria-hidden="true"
      />
    </section>
  );
}
