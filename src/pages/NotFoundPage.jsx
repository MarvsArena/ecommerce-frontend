import { Link } from "react-router-dom";
import Container from "../components/Container";

const NotFoundPage = () => (
  <Container width="max-w-4xl" className="py-24 text-center">
    <p className="text-xs uppercase tracking-[0.45em] text-brand-gold">404</p>
    <h1 className="mt-6 font-display text-6xl text-slate-950 dark:text-white">This page slipped off the lace.</h1>
    <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-white/65">
      The page you’re looking for isn’t available. Return to the boutique and keep exploring the collection.
    </p>
    <Link to="/" className="button-primary mt-8 inline-flex">
      Return Home
    </Link>
  </Container>
);

export default NotFoundPage;
