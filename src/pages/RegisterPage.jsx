import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "../components/Container";
import PasswordField from "../components/PasswordField";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(form);
      navigate("/dashboard");
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="grid gap-8 py-12 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
      <Reveal variant="slideRight" className="luxury-panel p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Join the Boutique</p>
        <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">Create your OMD Hairville account</h1>
        <p className="mt-4 text-slate-600 dark:text-white/65">
          Save your details, checkout with ease, and track premium orders from your personal dashboard.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <label>
            <span className="field-label">Full Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="input-field"
              required
            />
          </label>
          <label>
            <span className="field-label">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="input-field"
              required
            />
          </label>
          <PasswordField
            label="Password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
            minLength={6}
            hint="Use at least 6 characters."
          />
          {error && <div className="alert-error">{error}</div>}
          <button type="submit" disabled={loading} className="button-primary w-full justify-center disabled:opacity-60">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="auth-helper-link">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-gold hover:text-brand-gold-light">
            Login
          </Link>
        </p>
      </Reveal>

      <Reveal variant="slideLeft" className="luxury-panel overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Luxury wig model"
          className="h-full min-h-[420px] w-full object-cover sm:min-h-[520px] lg:min-h-[620px]"
        />
      </Reveal>
    </Container>
  );
};

export default RegisterPage;
