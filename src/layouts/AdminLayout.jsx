import { NavLink, Outlet } from "react-router-dom";

import Container from "../components/Container";
import {
  ClipboardListIcon,
  LayoutGridIcon,
  PackageIcon,
  PencilSquareIcon,
} from "../components/Icons";

const adminLinks = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutGridIcon,
    end: true,
  },
  {
    to: "/admin/api/products",
    label: "Products",
    icon: PackageIcon,
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: ClipboardListIcon,
  },
  {
    to: "/admin/profile",
    label: "Profile",
    icon: PencilSquareIcon,
  },
];

const AdminLayout = () => (
  <Container className="py-12 sm:py-14 lg:py-16">
    <div className="panel-highlight p-8">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Admin Suite</p>
      <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">Manage OMD Hairville with clarity</h1>
      <p className="mt-4 max-w-3xl text-slate-600 dark:text-white/65">
        Review store performance, update inventory, manage orders, and maintain your admin account
        from one structured workspace.
      </p>
    </div>

    <nav className="mt-8 flex flex-wrap items-center gap-3 rounded-[2rem] border border-black/10 bg-white/65 p-3 dark:border-white/10 dark:bg-white/[0.03]">
      {adminLinks.map((link) => {
        const LinkIcon = link.icon;

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-brand-gold text-black"
                  : "border border-black/10 bg-white/70 text-slate-700 hover:border-brand-gold/35 hover:text-slate-950 dark:border-white/10 dark:bg-black/20 dark:text-white/72 dark:hover:text-white"
              }`
            }
          >
            <LinkIcon className="h-4 w-4" />
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </nav>

    <div className="mt-8">
      <Outlet />
    </div>
  </Container>
);

export default AdminLayout;
