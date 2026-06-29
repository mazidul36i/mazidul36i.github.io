import type { Profile, StatCard } from "../../types";
import { scrollToId } from "../../lib/scroll";
import { ArrowUpRight } from "../common/Icons";
import "./Hero.css";

/** A single floating stat card; renders as a link when `href` is present. */
function StatCardView({ card, className }: { card: StatCard; className: string }) {
  const { num, label, href } = card;
  const inner = (
    <>
      <div className="sc-num">{num}</div>
      <div className="sc-label">{label}</div>
    </>
  );
  if (!href) return <div className={className}>{inner}</div>;
  const internal = href.startsWith("#");
  return (
    <a
      className={className + " stat-card--link"}
      href={href}
      onClick={internal ? scrollToId(href.slice(1)) : undefined}
      target={internal ? undefined : "_blank"}
      rel="noreferrer"
    >
      {inner}
    </a>
  );
}

interface HeroProps {
  profile: Profile;
  cards: StatCard[];
  headline: string;
}

/** Split hero: left headline + CTAs, right portrait medallion with floating stats. */
export function Hero({ profile, cards, headline }: HeroProps) {
  return (
    <section className="spot-hero" id="home">
      <div className="spot-bg" aria-hidden="true" />
      <div className="shell spot-grid">
        {/* left — copy */}
        <div className="spot-copy">
          <h1 className="spot-title">
            <span className="lead">Hi! I'm {profile.name}, engineering</span>
            <span className="big">{headline}</span>
          </h1>
          <p className="spot-sub">
            Backend engineer turning days of manual work into a single upload — shipping AI tooling,
            data-quality engines &amp; integrations on Spring Boot, PostgreSQL and Elasticsearch.
          </p>
          <div className="spot-actions">
            <a href="#contact" onClick={scrollToId("contact")} className="spot-btn primary">
              Let's Connect
            </a>
            <a href="#projects" onClick={scrollToId("projects")} className="spot-btn ghost">
              See My Work
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="spot-btn link">
              Resume
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* right — portrait + floating stat cards */}
        <div className="spot-stage">
          <div className="spot-ring" aria-hidden="true" />
          <div className="spot-glow" aria-hidden="true" />
          <div className="spot-portrait">
            <img src={profile.photo} alt={profile.name} loading="eager" />
            <span className="sp-tint" aria-hidden="true" />
            <span className="sp-vignette" aria-hidden="true" />
          </div>

          {cards.map((c, i) => (
            <StatCardView key={i} card={c} className={"stat-card pos-" + (i + 1)} />
          ))}
        </div>
      </div>

      {/* mobile fallback stat grid */}
      <div className="shell spot-stats-mobile">
        {cards.map((c, i) => (
          <StatCardView key={i} card={c} className="stat-card" />
        ))}
      </div>
    </section>
  );
}
