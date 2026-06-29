import { SectionHead } from "../common/SectionHead";
import "./About.css";

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
          sub="From Excel-driven master-data pipelines to natural-language data ops, I like the parts of software that disappear into someone's day."
        />
        <div className="about-grid">
          <div className="about-prose fade-up">
            <p>
              I'm a backend-leaning Software Engineer with <strong>3+ years</strong> shipping
              production systems at <strong>Prospecta Software</strong>, where I work across Spring
              Boot, PostgreSQL, Elasticsearch, RabbitMQ, gRPC, and Apache Spark.
            </p>
            <p>
              My work centers on the <strong>Master Data Online (MDO)</strong> platform: an AI chat
              for master-data CRUD, a no-code rules engine covering ~60% of client validation needs,
              scheduled data-quality runs, and a 360° record view that cut custom dashboard requests
              by 70%.
            </p>
            <p>
              Before Prospecta I shipped <strong>Internet Speed Meter</strong> on the Play Store
              (500K+ installs) and started <strong>Open Solutions</strong> — a small blog
              documenting the practical fixes I wished I'd had. I care about clean APIs, predictable
              data, and software that quietly makes other people's work faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
