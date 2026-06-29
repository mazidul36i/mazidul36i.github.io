import { useEffect, useRef, useState } from "react";

/** Interactive elements that enlarge the cursor ring on hover. */
const HOVER_TARGETS = "a, button, .proj-card, .skill-chip, .pn-link, .pn-cta, .spot-btn, .contact-link";

/**
 * Custom cursor: a small dot that tracks the pointer exactly and a ring that
 * eases toward it, growing over interactive elements. Disabled on touch.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      setHover(!!t?.closest(HOVER_TARGETS));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className={"cursor-ring" + (hover ? " hover" : "")} ref={ringRef} />
    </>
  );
}
