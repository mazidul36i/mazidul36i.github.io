import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "../../../types";
import { domainOf } from "../../../lib/scroll";
import { ArrowUpRight, Close, Expand } from "../../common/Icons";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectCardProps {
  project: Project;
  hue: number;
  /** Whether this card is the one expanded into the detail view. */
  active: boolean;
  onActivate: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
}

const DURATION = 620;

/** The centered resting rect the card morphs into when expanded. */
function expandedRect() {
  const w = Math.min(window.innerWidth * 0.86, 1180);
  const h = Math.min(window.innerHeight * 0.82, 820);
  return {
    top: (window.innerHeight - h) / 2,
    left: (window.innerWidth - w) / 2,
    width: w,
    height: h,
  };
}

function setBox(el: HTMLElement, top: number, left: number, width: number, height: number) {
  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
}

function clearBox(el: HTMLElement) {
  for (const prop of ["position", "top", "left", "width", "height", "transition", "willChange"]) {
    el.style.removeProperty(prop.replace(/([A-Z])/g, "-$1").toLowerCase());
  }
}

/**
 * A single project card that morphs in place into a full detail view on hover.
 * The same DOM element grows from its grid slot to a centered panel and back —
 * there is no separate overlay. A sibling `.proj-cell` wrapper holds the grid
 * space so the layout never reflows while this card is popped out of flow.
 */
export function ProjectCard({
  project,
  hue,
  active,
  onActivate,
  onScheduleClose,
  onClose,
}: ProjectCardProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const timer = useRef<number | undefined>(undefined);
  // Kept in state so React never re-renders the class off mid-animation, but
  // also toggled imperatively below to avoid a one-frame flash on collapse.
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const cell = cellRef.current;
    if (!card || !cell) return;
    clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (active) {
      // --- expand: fix at the grid slot, then release to the centered rect ---
      // Measure and freeze the slot BEFORE the card leaves the flow, otherwise
      // the cell collapses and both the frozen height and start rect are wrong.
      const from = cell.getBoundingClientRect();
      cell.style.height = `${from.height}px`; // freeze the slot so siblings hold
      setExpanded(true);
      card.classList.add("is-expanded");
      const to = expandedRect();

      card.style.position = "fixed";
      card.style.willChange = "top, left, width, height";
      if (reduce) {
        card.style.transition = "none";
        setBox(card, to.top, to.left, to.width, to.height);
        return;
      }
      card.style.transition = "none";
      setBox(card, from.top, from.left, from.width, from.height);
      card.getBoundingClientRect(); // force the start frame
      requestAnimationFrame(() => {
        card.style.removeProperty("transition"); // fall back to the CSS transition
        setBox(card, to.top, to.left, to.width, to.height);
      });
    } else {
      // --- collapse: animate back into the (still-reserved) grid slot ---
      if (!card.classList.contains("is-expanded")) return;
      const to = cell.getBoundingClientRect();
      const finish = () => {
        clearBox(card);
        card.classList.remove("is-expanded");
        cell.style.removeProperty("height");
        setExpanded(false);
      };
      if (reduce) {
        finish();
        return;
      }
      card.style.removeProperty("transition");
      setBox(card, to.top, to.left, to.width, to.height);
      timer.current = window.setTimeout(finish, DURATION + 40);
    }
  }, [active]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="proj-cell" ref={cellRef}>
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={"proj-card" + (expanded ? " is-expanded" : "")}
        style={{ "--h": hue } as CSSProperties}
        onMouseEnter={onActivate}
        onMouseLeave={onScheduleClose}
      >
        <span
          className="po-close"
          role="button"
          aria-label="Close preview"
          onClick={handleClose}
        >
          <Close size={16} />
        </span>

        <div className="proj-preview">
          <ProjectPreview project={project} />
          <span className="pp-expand">
            <Expand size={14} />
            Preview
          </span>
        </div>

        <div className="proj-info">
          <div className="proj-info-top">
            <span className="proj-pill">{project.em}</span>
            <span className="proj-arrow">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.blurb}</p>
          <div className="proj-stack">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>

          <div className="proj-extra">
            <dl className="po-meta">
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              {project.badge && (
                <div>
                  <dt>Reach</dt>
                  <dd>{project.badge}</dd>
                </div>
              )}
              <div>
                <dt>Link</dt>
                <dd>{domainOf(project.href)}</dd>
              </div>
            </dl>
            <span className="po-cta">
              Visit project
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
