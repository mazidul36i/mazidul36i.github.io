import { PROFILE } from "../../data/profile";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
        <div className="signature">— made with intent.</div>
      </div>
    </footer>
  );
}
