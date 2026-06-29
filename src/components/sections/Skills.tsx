import { SKILLS } from "../../data/skills";
import { SectionHead } from "../common/SectionHead";
import "./Skills.css";

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <SectionHead
          num="/03"
          label="Stack"
          title={
            <>
              The <span className="em">tools</span> I reach for.
            </>
          }
          sub="Production-grade tools I've used to ship; the rest is the willingness to learn whatever the problem needs."
        />
        <div className="skills-grid">
          {SKILLS.map((row) => (
            <div className="skill-row fade-up" key={row.label}>
              <div className="label">{row.label}</div>
              <div className="items">
                {row.items.map((it) => (
                  <span className="skill-chip" key={it.name}>
                    {it.icon ? <img src={it.icon} alt="" /> : <span className="skill-dot" />}
                    {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
