import { useEffect, useMemo, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import Container from "./Container";
import { BagIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from "./Icons";

const navLinkClass = ({ isActive }) =>
  `transition-colors ${isActive ? "text-brand-gold" : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"}`;

const utilityButtonClass =
  "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/20 bg-black text-brand-gold shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition hover:border-brand-gold/45 hover:text-brand-gold-light";

const sidebarActionClass =
  "flex w-full items-center justify-between rounded-[1.25rem] border border-brand-gold/15 bg-black px-4 py-3 text-sm font-medium text-white transition hover:border-brand-gold/35";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mobileLinks = useMemo(
    () => [
      { to: "/", label: "Home", visible: true },
      { to: "/shop", label: "Shop", visible: true },
      { to: "/cart", label: `Cart${totalItems ? ` (${totalItems})` : ""}`, visible: true },
      { to: "/contact", label: "Contact", visible: true },
      { to: "/dashboard", label: "Profile", visible: Boolean(user) },
      { to: "/admin", label: "Admin", visible: isAdmin },
      { to: "/login", label: "Login", visible: !user },
      { to: "/register", label: "Register", visible: !user },
    ].filter((item) => item.visible),
    [isAdmin, totalItems, user],
  );

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f9f2e7]/78 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-black/75">
        <Container
          as="div"
          className="flex items-center justify-between gap-4 py-4"
        >
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/branding/omd-hairville-logo.svg"
            alt="OMD Hairville"
            className="h-11 w-auto rounded-xl border border-brand-gold/30 bg-black/90 p-1.5 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
          />
          <div className="hidden min-[480px]:block">
            <p className="font-display text-xl tracking-wide text-brand-gold">OMD Hairville</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/55">
              Premium Wig Boutique
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <button
              type="button"
              onClick={toggleTheme}
              className={utilityButtonClass}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              title={`Current theme: ${theme}`}
            >
              {isDarkMode ? <MoonIcon className="h-[18px] w-[18px]" /> : <SunIcon className="h-[18px] w-[18px]" />}
            </button>
          </div>

          <Link
            to="/cart"
            className={utilityButtonClass}
            aria-label="Shopping cart"
          >
            <BagIcon className="h-[18px] w-[18px]" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-brand-gold px-1.5 py-0.5 text-[10px] font-semibold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-950 dark:text-white">{user.name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-brand-gold/80">{user.role}</p>
              </div>
              <button type="button" onClick={handleLogout} className="button-secondary text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="button-secondary text-sm">
                Login
              </Link>
              <Link to="/register" className="button-primary text-sm">
                Join Us
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className={`${utilityButtonClass} md:hidden`}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[min(82vw,340px)] flex-col border-r border-brand-gold/15 bg-[#fbf3e7] shadow-[0_32px_90px_rgba(0,0,0,0.24)] transition-transform duration-300 ease-out dark:bg-[#050505] md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div>
            <p className="font-display text-xl text-brand-gold">OMD Hairville</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-white/55">
              Premium Wig Boutique
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className={utilityButtonClass}
            aria-label="Close navigation menu"
          >
            <XIcon className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {user ? (
            <div className="mb-6 rounded-[1.5rem] border border-brand-gold/15 bg-black px-4 py-4 text-brand-gold shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-brand-gold/80">{user.role}</p>
            </div>
          ) : null}

          <nav className="space-y-2">
            {mobileLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center rounded-[1.25rem] px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-gold text-black"
                      : "text-slate-700 hover:bg-black/[0.05] hover:text-slate-950 dark:text-white/78 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 block md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className={sidebarActionClass}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              <span>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
              {isDarkMode ? <MoonIcon className="h-4 w-4 text-brand-gold" /> : <SunIcon className="h-4 w-4 text-brand-gold" />}
            </button>
          </div>
        </div>

        <div className="border-t border-black/10 px-5 py-5 dark:border-white/10">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="button-secondary w-full justify-center"
            >
              Logout
            </button>
          ) : (
            <div className="grid gap-3">
              <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="button-secondary w-full justify-center">
                Login
              </Link>
              <Link to="/register" onClick={() => setIsSidebarOpen(false)} className="button-primary w-full justify-center">
                Join Us
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
