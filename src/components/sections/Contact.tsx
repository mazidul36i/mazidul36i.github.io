import type { ReactNode } from "react";
import type { Profile } from "../../types";
import { SectionHead } from "../common/SectionHead";
import { ArrowUpRight, ArrowDown } from "../common/Icons";
import "./Contact.css";

interface ContactLinkProps {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

function ContactLink({ label, value, href, external, icon }: ContactLinkProps) {
  return (
    <a
      className="contact-link"
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <div>
        <div className="key">{label}</div>
        <div className="contact-link-val">{value}</div>
      </div>
      <span className="arrow">{icon ?? <ArrowUpRight size={20} strokeWidth={1.5} />}</span>
    </a>
  );
}

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <SectionHead title="Let's talk." />

        <div className="contact-grid">
          <div className="fade-up">
            <h3 className="contact-headline">
              Have a backend that needs <span className="em">untangling</span>?
            </h3>

            <ContactLink label="Email" value={profile.email} href={"mailto:" + profile.email} />
            <ContactLink
              label="LinkedIn"
              value="linkedin.com/in/mazidul36i"
              href={profile.linkedin}
              external
            />
            <ContactLink
              label="GitHub"
              value="github.com/mazidul36i"
              href={profile.github}
              external
            />
            <ContactLink
              label="Resume"
              value="Mazidul_Islam_Resume.pdf"
              href={profile.resume}
              external
              icon={<ArrowDown size={20} strokeWidth={1.5} />}
            />
          </div>

          <div className="contact-side fade-up">
            <h4>// open to</h4>
            <p>
              Backend / full-stack roles, contract work on data-heavy systems, or interesting
              open-source collaborations. Hybrid in Bengaluru or fully remote.
            </p>
            <h4 className="contact-side-h">// response</h4>
            <p>
              I read everything that lands at{" "}
              <span className="mono contact-inline-email">{profile.email}</span> and try to reply
              within a working day.
            </p>
            <h4 className="contact-side-h">// timezone</h4>
            <p>IST (UTC+5:30). Comfortable overlapping with EU mornings or US evenings.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
