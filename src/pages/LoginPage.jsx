import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Container from "../components/Container";
import PasswordField from "../components/PasswordField";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const authUser = await login(form);
      const nextPath =
        authUser.role === "admin"
          ? "/admin"
          : redirectTo === "/admin"
            ? "/dashboard"
            : redirectTo;
      navigate(nextPath, { replace: true });
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="grid gap-8 py-12 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:py-16">
      <Reveal variant="slideRight" className="luxury-panel overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="OMD Hairville luxury model"
          className="h-full min-h-[420px] w-full object-cover sm:min-h-[520px] lg:min-h-[620px]"
        />
      </Reveal>
      <Reveal variant="slideLeft" className="luxury-panel p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Welcome Back</p>
        <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">Login to your boutique account</h1>
        <p className="mt-4 text-slate-600 dark:text-white/65">
          Access your orders, checkout faster, and keep track of premium picks in your cart.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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
          />
          {error && <div className="alert-error">{error}</div>}
          <button type="submit" disabled={loading} className="button-primary w-full justify-center disabled:opacity-60">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="auth-helper-link">
          New to OMD Hairville?{" "}
          <Link to="/register" className="text-brand-gold hover:text-brand-gold-light">
            Create an account
          </Link>
        </p>
      </Reveal>
    </Container>
  );
};

export default LoginPage;
