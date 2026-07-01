import { useEffect, useRef, useState } from "react";
import { PROJECTS, PROJECT_HUES } from "../../../data/projects";
import { SectionHead } from "../../common/SectionHead";
import { ProjectCard } from "./ProjectCard";
import { ProjectOverlay } from "./ProjectOverlay";
import "./Projects.css";

const hueFor = (i: number) => PROJECT_HUES[i % PROJECT_HUES.length];

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [show, setShow] = useState(false);
  const closeT = useRef<number | undefined>(undefined);
  const unmountT = useRef<number | undefined>(undefined);

  const open = (i: number, rect: DOMRect) => {
    clearTimeout(closeT.current);
    clearTimeout(unmountT.current);
    setActive(i);
    setOrigin(rect);
    requestAnimationFrame(() => setShow(true));
  };
  const doClose = () => {
    clearTimeout(closeT.current);
    setShow(false);
    unmountT.current = window.setTimeout(() => setActive(null), 720);
  };
  const scheduleClose = () => {
    clearTimeout(closeT.current);
    closeT.current = window.setTimeout(doClose, 180);
  };
  const cancelClose = () => clearTimeout(closeT.current);

  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") doClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const activeProject = active != null ? PROJECTS[active] : null;

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
          sub="Apps, APIs and oddments — some shipped to half a million users, some just for fun. Hover any card for a closer look."
        />
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              hue={hueFor(i)}
              onOpen={(rect) => open(i, rect)}
              onScheduleClose={scheduleClose}
            />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectOverlay
          project={activeProject}
          hue={hueFor(active!)}
          show={show}
          originRect={origin}
          onClose={doClose}
          onCancelClose={cancelClose}
          onScheduleClose={scheduleClose}
        />
      )}
    </section>
  );
}
