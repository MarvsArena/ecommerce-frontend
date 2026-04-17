import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const StoreLayout = () => (
  <div className="min-h-screen overflow-x-hidden bg-transparent text-slate-950 transition-colors dark:text-white">
    <div className="page-glow" />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default StoreLayout;
