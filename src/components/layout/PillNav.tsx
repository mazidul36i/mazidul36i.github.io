import type { Profile } from "../../types";
import { useScrolled } from "../../hooks/useScrolled";
import { scrollToId } from "../../lib/scroll";
import "./PillNav.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

interface PillNavProps {
  profile: Profile;
  cta?: string;
}

/** Floating frosted-glass pill navigation bar. */
export function PillNav({ profile, cta = "Let's talk" }: PillNavProps) {
  const scrolled = useScrolled();
  return (
    <div className={"pill-nav-wrap" + (scrolled ? " scrolled" : "")}>
      <nav className="pill-nav">
        <a className="pn-brand" href="#home" onClick={scrollToId("home")}>
          {profile.name.toUpperCase()}
        </a>
        <span className="pn-divider" aria-hidden="true" />
        <div className="pn-links">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={"#" + l.id} onClick={scrollToId(l.id)} className="pn-link">
              {l.label}
            </a>
          ))}
        </div>
        <a className="pn-cta" href="#contact" onClick={scrollToId("contact")}>
          {cta}
        </a>
      </nav>
    </div>
  );
}
