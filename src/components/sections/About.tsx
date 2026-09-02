import { SectionHead } from "../common/SectionHead";
import "./About.css";

/** Working principles shown in the right rail — the habits that transfer across stacks. */
const PRINCIPLES = [
  {
    title: "Learn the domain first",
    body: "Good systems come from understanding the problem, not the framework.",
  },
  {
    title: "Design for year two",
    body: "Schemas, APIs, and queues that survive growth — not just the demo.",
  },
  {
    title: "Automate the boring",
    body: "If it's done manually twice, it becomes a pipeline.",
  },
  {
    title: "Ship, measure, simplify",
    body: "Scale is proven in production, not in diagrams.",
  },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <SectionHead
          title={
            <>
              A quiet <span className="em">obsession</span> with making things faster.
            </>
          }
          sub="From a Play Store app with half a million installs to enterprise data platforms — I like the parts of software that disappear into someone's day."
        />
        <div className="about-grid">
          <div className="about-prose fade-up">
            <p>
              I'm a backend-leaning Software Engineer with <strong>3+ years</strong> shipping
              production systems — and a track record wider than any one stack: an Android app grown
              solo to <strong>500K+ installs</strong>, and an enterprise master-data platform
              serving global clients at <strong>Prospecta Software</strong>.
            </p>
            <p>
              The domain keeps changing under me — AI chat interfaces, no-code rules engines,
              scheduled data-quality runs, SAP integrations — and that's the part I enjoy. Give me a
              new environment and I'll learn it, model it, and ship a system that holds up:{" "}
              <strong>~60%</strong> of client validation needs covered without code, custom
              dashboard requests down <strong>70%</strong>.
            </p>
            <p>
              Day to day that means Spring Boot, PostgreSQL, Elasticsearch, RabbitMQ, gRPC, and
              Apache Spark; before that it was Android and my <strong>Open Solutions</strong> blog.
              The tools change per project — the habits don't: clean APIs, predictable data, and
              software that quietly makes other people's work faster.
            </p>
          </div>

          <aside className="about-aside fade-up">
            <div className="about-aside-label mono">How I work</div>
            <ol className="about-principles">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title}>
                  <span className="idx mono">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="about-now mono">
              Now — Software Engineer @ Prospecta Software · India
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
