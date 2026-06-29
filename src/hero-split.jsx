// hero-split.jsx — reference-style split hero: floating pill nav,
// left headline + CTAs, right portrait medallion ringed by frosted stat cards.
(function () {
  const { useEffect, useRef, useState } = React;

  /* ---------- floating pill nav ---------- */
  const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" }];


  function PillNav({ profile, cta = "Let's talk" }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 12);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const go = (id) => (e) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (
      <div className={"pill-nav-wrap" + (scrolled ? " scrolled" : "")}>
        <nav className="pill-nav">
          <a className="pn-brand" href="#home" onClick={go("home")}>
            {profile.name.toUpperCase()}
          </a>
          <span className="pn-divider" aria-hidden="true"></span>
          <div className="pn-links">
            {NAV_LINKS.map((l) =>
            <a key={l.id} href={"#" + l.id} onClick={go(l.id)} className="pn-link">
                {l.label}
              </a>
            )}
          </div>
          <a className="pn-cta" href="#contact" onClick={go("contact")}>
            {cta}
          </a>
        </nav>
      </div>);

  }

  /* ---------- spotlight hero ---------- */
  function SplitHero({ profile, cards, headline }) {
    const go = (id) => (e) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
      <section className="spot-hero" id="home">
        <div className="spot-bg" aria-hidden="true"></div>
        <div className="shell spot-grid">
          {/* left — copy */}
          <div className="spot-copy">
            <h1 className="spot-title">
              <span className="lead">Hi! I'm {profile.name}, engineering</span>
              <span className="big">{headline}</span>
            </h1>
            <p className="spot-sub">
              Backend engineer turning days of manual work into a single upload —
              shipping AI tooling, data-quality engines &amp; integrations on Spring Boot,
              PostgreSQL and Elasticsearch.
            </p>
            <div className="spot-actions">
              <a href="#contact" onClick={go("contact")} className="spot-btn primary">
                Let's Connect
              </a>
              <a href="#projects" onClick={go("projects")} className="spot-btn ghost">
                See My Work
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="spot-btn link">
                Resume
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* right — portrait + floating stat cards */}
          <div className="spot-stage">
            <div className="spot-ring" aria-hidden="true"></div>
            <div className="spot-glow" aria-hidden="true"></div>
            <div className="spot-portrait">
              <img src={profile.photo} alt={profile.name} loading="eager" />
              <span className="sp-tint" aria-hidden="true"></span>
              <span className="sp-vignette" aria-hidden="true"></span>
            </div>

            {cards.map((c, i) =>
            c.href ?
            <a className={"stat-card stat-card--link pos-" + (i + 1)} key={i} href={c.href} onClick={c.href[0] === "#" ? go(c.href.slice(1)) : undefined} target={c.href[0] === "#" ? undefined : "_blank"} rel="noreferrer">
                <div className="sc-num">{c.num}</div>
                <div className="sc-label">{c.label}</div>
              </a> :
            <div className={"stat-card pos-" + (i + 1)} key={i}>
                <div className="sc-num">{c.num}</div>
                <div className="sc-label">{c.label}</div>
              </div>
            )}
          </div>
        </div>

        {/* mobile fallback stat grid */}
        <div className="shell spot-stats-mobile">
          {cards.map((c, i) =>
          c.href ?
          <a className="stat-card stat-card--link" key={i} href={c.href} onClick={c.href[0] === "#" ? go(c.href.slice(1)) : undefined} target={c.href[0] === "#" ? undefined : "_blank"} rel="noreferrer">
              <div className="sc-num">{c.num}</div>
              <div className="sc-label">{c.label}</div>
            </a> :
          <div className="stat-card" key={i}>
              <div className="sc-num">{c.num}</div>
              <div className="sc-label">{c.label}</div>
            </div>
          )}
        </div>
      </section>);

  }

  window.PillNav = PillNav;
  window.SplitHero = SplitHero;
})();
