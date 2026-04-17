import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ClipboardListIcon,
  LayoutGridIcon,
  PackageIcon,
  TruckIcon,
  UsersIcon,
} from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import Reveal from "../components/Reveal";
import StatusBadge from "../components/StatusBadge";
import { getProducts } from "../services/productService";
import { getAllOrders } from "../services/orderService";
import { staggerContainer } from "../utils/motion";
import { formatCurrency } from "../utils/currency";

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminOverview = async () => {
      try {
        const [productData, orderData] = await Promise.all([getProducts(), getAllOrders()]);
        setProducts(productData);
        setOrders(orderData);
        setError("");
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load admin overview right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminOverview();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter((order) => ["pending", "processing"].includes(order.orderStatus)).length;
  const deliveryOrders = orders.filter((order) => order.deliveryMethod === "delivery").length;

  const stats = [
    {
      label: "Products",
      value: products.length,
      helper: "Active catalog items",
      icon: PackageIcon,
    },
    {
      label: "Orders",
      value: orders.length,
      helper: "All customer orders",
      icon: ClipboardListIcon,
    },
    {
      label: "Revenue",
      value: formatCurrency(totalRevenue),
      helper: "Gross order total",
      icon: LayoutGridIcon,
    },
    {
      label: "Deliveries",
      value: deliveryOrders,
      helper: "Orders marked for delivery",
      icon: TruckIcon,
    },
  ];

  if (loading) {
    return <LoadingSpinner label="Loading admin overview" />;
  }

  if (error) {
    return (
      <div className="alert-error px-6 py-5">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={staggerContainer(0.04, 0.08)}
        className="grid gap-4 xl:grid-cols-4"
      >
      {stats.map((stat, index) => {
          const StatIcon = stat.icon;

          return (
            <Reveal key={stat.label} as="article" className="luxury-panel p-6" delay={index * 0.04}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                <StatIcon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.32em] text-slate-400 dark:text-white/45">{stat.label}</p>
              <p className="mt-3 font-display text-4xl text-slate-950 dark:text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-white/55">{stat.helper}</p>
            </Reveal>
          );
        })}
      </motion.div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="luxury-panel p-7" variant="slideRight">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Operations Snapshot</p>
              <h2 className="mt-3 font-display text-3xl text-slate-950 dark:text-white">Store momentum at a glance</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="surface-card p-5">
              <p className="text-sm text-slate-500 dark:text-white/55">Pending or processing</p>
              <p className="mt-3 font-display text-3xl text-slate-950 dark:text-white">{pendingOrders}</p>
            </div>
            <div className="surface-card p-5">
              <p className="text-sm text-slate-500 dark:text-white/55">Featured products</p>
              <p className="mt-3 font-display text-3xl text-slate-950 dark:text-white">
                {products.filter((product) => product.featured).length}
              </p>
            </div>
            <div className="surface-card p-5">
              <p className="text-sm text-slate-500 dark:text-white/55">Pickup orders</p>
              <p className="mt-3 font-display text-3xl text-slate-950 dark:text-white">
                {orders.filter((order) => order.deliveryMethod === "pickup").length}
              </p>
            </div>
            <div className="surface-card p-5">
              <p className="text-sm text-slate-500 dark:text-white/55">Delivered orders</p>
              <p className="mt-3 font-display text-3xl text-slate-950 dark:text-white">
                {orders.filter((order) => order.orderStatus === "delivered").length}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="luxury-panel p-7" variant="slideLeft">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Quick Access</p>
          <div className="mt-6 space-y-4">
            {[
              {
                to: "/admin/products",
                title: "Manage Products",
                description: "Create, edit, and keep stock levels accurate.",
              },
              {
                to: "/admin/orders",
                title: "Review Orders",
                description: "Inspect customer, payment, and delivery details in one place.",
              },
              {
                to: "/admin/profile",
                title: "Admin Profile",
                description: "Update your account details and keep credentials current.",
              },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-[1.6rem] border border-black/10 bg-white/72 p-5 transition hover:border-brand-gold/30 hover:bg-white/90 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
              >
                <p className="font-display text-2xl text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-white/55">{item.description}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="luxury-panel p-7" variant="slideRight">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-slate-950 dark:text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="button-secondary">
              View All
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {orders.slice(0, 4).map((order) => (
              <article key={order._id} className="rounded-[1.6rem] border border-black/10 bg-white/72 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-slate-950 dark:text-white">{order.user?.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-white/50">{order.user?.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={order.paymentStatus} />
                    <StatusBadge status={order.orderStatus} />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-white/55">{order.deliveryMethod}</p>
                  <p className="text-lg font-semibold text-brand-gold">{formatCurrency(order.totalPrice)}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="luxury-panel p-7" variant="slideLeft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-slate-950 dark:text-white">Low Stock Attention</h2>
            <Link to="/admin/products" className="button-secondary">
              Open Products
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {products
              .filter((product) => product.stock <= 10)
              .slice(0, 5)
              .map((product) => (
                <article key={product._id} className="rounded-[1.6rem] border border-black/10 bg-white/72 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center gap-4">
                    <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="text-slate-950 dark:text-white">{product.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-white/50">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500 dark:text-white/55">Stock</p>
                      <p className="mt-1 font-semibold text-brand-gold">{product.stock}</p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
