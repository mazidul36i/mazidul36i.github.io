// portfolio.jsx — main React app
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- cursor ---------- */
function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    const onMove = (e) => {
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

    const onOver = (e) => {
      const t = e.target;
      if (t.closest("a, button, .project-row, .proj-card, .skill-chip, .nav-link, .btn, .contact-link")) {
        setHover(true);
      } else {
        setHover(false);
      }
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

/* ---------- about ---------- */
function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head section-head--full fade-up">
          <div>
            <h2 className="section-title">A quiet <span className="em">obsession</span> with making things faster.</h2>
            <p className="section-sub">From Excel-driven master-data pipelines to natural-language data ops, I like the parts of software that disappear into someone's day.</p>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-prose fade-up">
            <p>
              I'm a backend-leaning Software Engineer with <strong>3+ years</strong> shipping
              production systems at <strong>Prospecta Software</strong>, where I work across
              Spring Boot, PostgreSQL, Elasticsearch, RabbitMQ, gRPC, and Apache Spark.
            </p>
            <p>
              My work centers on the <strong>Master Data Online (MDO)</strong> platform:
              an AI chat for master-data CRUD, a no-code rules engine covering ~60% of client
              validation needs, scheduled data-quality runs, and a 360° record view that
              cut custom dashboard requests by 70%.
            </p>
            <p>
              Before Prospecta I shipped <strong>Internet Speed Meter</strong> on the Play Store
              (500K+ installs) and started <strong>Open Solutions</strong> — a small blog
              documenting the practical fixes I wished I'd had. I care about clean APIs,
              predictable data, and software that quietly makes other people's work faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- experience ---------- */
function Experience({ workSubtitle, highlightCount }) {
  const [tab, setTab] = useState("Featured");
  const [showAll, setShowAll] = useState(false);
  const tabs = Object.keys(window.EXP_GROUPS);
  const indices = useMemo(() => {
    if (showAll) return window.EXPERIENCE_BULLETS.map((_, i) => i);
    return window.EXP_GROUPS[tab];
  }, [tab, showAll]);
  const bullets = indices.map((i) => ({ ...window.EXPERIENCE_BULLETS[i], i }));

  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-head fade-up">
          <div className="section-num"><span className="mono">/02</span><span className="label mono">— Work</span></div>
          <div>
            <h2 className="section-title">Where I've been <span className="em">shipping</span>.</h2>
            <p className="section-sub">{workSubtitle}</p>
          </div>
        </div>

        <div className="exp-header fade-up">
          <div className="org-logo">
            <img src="assets/icons/prospecta.webp" alt="Prospecta" />
          </div>
          <div>
            <h3 className="role">Development Engineer</h3>
            <div className="org-line">
              <a href="https://www.prospecta.com" target="_blank" rel="noreferrer">Prospecta Software</a>
              <span>·</span>
              <span>Master Data Online (MDO)</span>
              <span>·</span>
              <span>Bengaluru, IN</span>
            </div>
          </div>
          <div className="duration">FEB 2023 — PRESENT</div>
        </div>

        <div className="exp-tabs fade-up">
          {tabs.map((t) => (
            <button
              key={t}
              className={"exp-tab" + (!showAll && tab === t ? " active" : "")}
              onClick={() => { setTab(t); setShowAll(false); }}
            >
              {t}
            </button>
          ))}
          <button
            className={"exp-tab" + (showAll ? " active" : "")}
            onClick={() => setShowAll(true)}
          >
            All ({highlightCount})
          </button>
        </div>

        <div className="exp-list">
          {bullets.map((b, idx) => (
            <div className="exp-item fade-up" key={b.i + "-" + idx}>
              <div className="idx mono">/{String(b.i + 1).padStart(2, "0")}</div>
              <div className="body">
                <h4>
                  {b.link ? <a href={b.link} target="_blank" rel="noreferrer">{b.title} ↗</a> : b.title}
                </h4>
                <p>{b.body}</p>
                <div className="meta">
                  {b.stat && <span className="stat mono">→ {b.stat}</span>}
                  {b.stat && b.tags && <span style={{ margin: "0 12px", color: "var(--ink-3)" }}>·</span>}
                  {b.tags && b.tags.join(" · ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- skills ---------- */
function Skills() {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <div className="section-head fade-up">
          <div className="section-num"><span className="mono">/03</span><span className="label mono">— Stack</span></div>
          <div>
            <h2 className="section-title">The <span className="em">tools</span> I reach for.</h2>
            <p className="section-sub">Production-grade tools I've used to ship; the rest is the willingness to learn whatever the problem needs.</p>
          </div>
        </div>
        <div className="skills-grid">
          {window.SKILLS.map((row) => (
            <div className="skill-row fade-up" key={row.label}>
              <div className="label">{row.label}</div>
              <div className="items">
                {row.items.map((it) => (
                  <span className="skill-chip" key={it.name}>
                    {it.icon ? <img src={it.icon} alt="" /> : <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: 999 }} />}
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

/* ---------- projects ---------- */
const PROJECT_HUES = [45, 250, 150, 320, 80];

function domainOf(href) {
  try { return new URL(href).hostname.replace(/^www\./, ""); }
  catch (e) { return href; }
}

// Shared browser-mockup preview (used in card + expanded overlay)
function PreviewInner({ p }) {
  return (
    <>
      <div className="pp-chrome">
        <span className="pp-dots"><i /><i /><i /></span>
        <span className="pp-url">{domainOf(p.href)}</span>
      </div>
      <div className="pp-cover">
        {p.badge && <span className="pp-badge">{p.badge}</span>}
        <div className="pp-nav">
          <span className="pp-wordmark"><span className="m" />{p.title}</span>
          <span className="pp-visit">Visit ↗</span>
        </div>
        <div className="pp-hero">
          <h4>{p.title}</h4>
          <div className="pp-sub mono">{p.em} · {p.stack[0]}</div>
          <span className="pp-cta">Open {p.em}</span>
        </div>
      </div>
    </>
  );
}

function Projects() {
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  const closeT = useRef();
  const unmountT = useRef();

  const open = (i) => {
    clearTimeout(closeT.current);
    clearTimeout(unmountT.current);
    setActive(i);
    requestAnimationFrame(() => setShow(true));
  };
  const doClose = () => {
    clearTimeout(closeT.current);
    setShow(false);
    unmountT.current = setTimeout(() => setActive(null), 380);
  };
  const scheduleClose = () => {
    clearTimeout(closeT.current);
    closeT.current = setTimeout(doClose, 180);
  };
  const cancelClose = () => clearTimeout(closeT.current);

  useEffect(() => {
    if (active == null) return;
    const onKey = (e) => { if (e.key === "Escape") doClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const ap = active != null ? window.PROJECTS[active] : null;
  const aHue = active != null ? PROJECT_HUES[active % PROJECT_HUES.length] : 45;

  return (
    <section className="section" id="projects">
      <div className="shell">
        <div className="section-head fade-up">
          <div className="section-num"><span className="mono">/04</span><span className="label mono">— Side work</span></div>
          <div>
            <h2 className="section-title">Things I've <span className="em">built</span> on the side.</h2>
            <p className="section-sub">Apps, APIs and oddments — some shipped to half a million users, some just for fun. Hover any card for a closer look.</p>
          </div>
        </div>
        <div className="proj-grid">
          {window.PROJECTS.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="proj-card fade-up"
              style={{ "--h": PROJECT_HUES[i % PROJECT_HUES.length] }}
              onMouseEnter={() => open(i)}
              onMouseLeave={scheduleClose}
            >
              <div className="proj-preview">
                <PreviewInner p={p} />
                <span className="pp-expand">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Preview
                </span>
              </div>

              <div className="proj-info">
                <div className="proj-info-top">
                  <span className="proj-pill">{p.em}</span>
                  <span className="proj-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="proj-stack">
                  {p.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {ap && (
        <div className={"proj-overlay" + (show ? " in" : "")} role="dialog" aria-modal="true" aria-label={ap.title}>
          <div className="po-backdrop" onClick={doClose} />
          <div
            className="po-panel"
            style={{ "--h": aHue }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <button className="po-close" onClick={doClose} aria-label="Close preview">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="po-grid">
              <div className="proj-preview po-preview">
                <PreviewInner p={ap} />
              </div>
              <div className="po-detail">
                <span className="proj-pill">{ap.em}</span>
                <h3 className="po-title">{ap.title}</h3>
                <p className="po-blurb">{ap.blurb}</p>
                <dl className="po-meta">
                  <div className="po-meta-stack">
                    <dt>Stack</dt>
                    <dd>
                      <div className="proj-stack">
                        {ap.stack.map((s) => <span key={s}>{s}</span>)}
                      </div>
                    </dd>
                  </div>
                  <div><dt>Year</dt><dd>{ap.year}</dd></div>
                  {ap.badge && <div><dt>Reach</dt><dd>{ap.badge}</dd></div>}
                  <div><dt>Link</dt><dd>{domainOf(ap.href)}</dd></div>
                </dl>
                <a className="po-cta" href={ap.href} target="_blank" rel="noreferrer">
                  Visit project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="section-head fade-up">
          <div className="section-num"><span className="mono">/05</span><span className="label mono">— Contact</span></div>
          <div>
            <h2 className="section-title">Let's talk.</h2>
          </div>
        </div>

        <div className="contact-grid">
          <div className="fade-up">
            <h3 className="contact-headline">
              Have a backend that needs <span className="em">untangling</span>?
            </h3>

            <a className="contact-link" href={"mailto:" + window.PROFILE.email}>
              <div>
                <div className="key">Email</div>
                <div style={{ fontSize: 18, marginTop: 6 }}>{window.PROFILE.email}</div>
              </div>
              <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="contact-link" href={window.PROFILE.linkedin} target="_blank" rel="noreferrer">
              <div>
                <div className="key">LinkedIn</div>
                <div style={{ fontSize: 18, marginTop: 6 }}>linkedin.com/in/mazidul36i</div>
              </div>
              <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="contact-link" href={window.PROFILE.github} target="_blank" rel="noreferrer">
              <div>
                <div className="key">GitHub</div>
                <div style={{ fontSize: 18, marginTop: 6 }}>github.com/mazidul36i</div>
              </div>
              <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="contact-link" href={window.PROFILE.resume} target="_blank" rel="noreferrer">
              <div>
                <div className="key">Resume</div>
                <div style={{ fontSize: 18, marginTop: 6 }}>Mazidul_Islam_Resume.pdf</div>
              </div>
              <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="contact-side fade-up">
            <h4>// open to</h4>
            <p>
              Backend / full-stack roles, contract work on data-heavy systems,
              or interesting open-source collaborations. Hybrid in Bengaluru or fully remote.
            </p>
            <h4 style={{ marginTop: 24 }}>// response</h4>
            <p>
              I read everything that lands at <span className="mono" style={{ color: "var(--ink)" }}>connect@mazidul.com</span>{" "}
              and try to reply within a working day.
            </p>
            <h4 style={{ marginTop: 24 }}>// timezone</h4>
            <p>
              IST (UTC+5:30). Comfortable overlapping with EU mornings or US evenings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="footer shell">
      <div>© 2026 — Mazidul Islam</div>
      <div className="signature">— made with intent.</div>
      <div>v3.0 · last shipped 03 May 2026</div>
    </footer>
  );
}

/* ---------- app ---------- */
const SPOT_CARDS = [
  { num: "500K+", label: "App Installs", href: "#projects" },
  { num: "3+", label: "Years Experience" },
  { num: "11+", label: "Features Shipped" },
  { num: "99%", label: "Data Accuracy" },
];

const WORK_SUBTITLE = "Three years of contributions to Master Data Online — these eleven are the highlights, the ones I’m proudest of, grouped by area.";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useReveal();

  return (
    <>
      <div className="grain" aria-hidden />
      <CursorFollower />
      <window.PillNav profile={window.PROFILE} cta="Let's talk" />
      <window.SplitHero
        profile={window.PROFILE}
        cards={SPOT_CARDS}
        headline="Software at Scale."
      />
      <About />
      <Experience workSubtitle={WORK_SUBTITLE} highlightCount={11} />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
