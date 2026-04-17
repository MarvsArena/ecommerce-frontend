import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => (
  <footer className="border-t border-black/10 bg-[#f8f1e4]/70 transition-colors dark:border-white/10 dark:bg-black">
    <Container as="div" className="grid gap-10 py-14 text-sm text-slate-600 dark:text-white/65 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
      <div>
        <p className="font-display text-2xl text-brand-gold">OMD Hairville</p>
        <p className="mt-4 max-w-md leading-7">
          A premium online hair boutique for luxury wigs, refined textures, and polished beauty
          experiences designed to feel as elevated as the final install.
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Boutique</p>
        <ul className="mt-4 space-y-3">
          <li>
            <Link to="/shop?category=Frontal%20Wigs" className="transition hover:text-slate-950 dark:hover:text-white">
              Frontal Units
            </Link>
          </li>
          <li>
            <Link to="/shop?category=Closure%20Wigs" className="transition hover:text-slate-950 dark:hover:text-white">
              Closure Wigs
            </Link>
          </li>
          <li>
            <Link to="/shop?category=Curly" className="transition hover:text-slate-950 dark:hover:text-white">
              Curly Textures
            </Link>
          </li>
          <li>
            <Link to="/contact" className="transition hover:text-slate-950 dark:hover:text-white">
              Contact Boutique
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Contact</p>
        <ul className="mt-4 space-y-3">
          <li>orders@omdhairville.com</li>
          <li>Lagos, Nigeria</li>
          <li>Luxury client support</li>
        </ul>
      </div>
    </Container>
  </footer>
);

export default Footer;
