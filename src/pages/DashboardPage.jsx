import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import {
  MailIcon,
  PackageIcon,
  PencilSquareIcon,
  ShieldIcon,
  SparklineIcon,
  UserCircleIcon,
} from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import PasswordField from "../components/PasswordField";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { getUserOrders } from "../services/orderService";
import { formatCurrency } from "../utils/currency";

const initialProfileForm = {
  name: "",
  email: "",
  password: "",
};

const DashboardPage = () => {
  const { user, refreshProfile, updateProfile } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileForm, setProfileForm] = useState(initialProfileForm);
  const [profileStatus, setProfileStatus] = useState("");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [data, profile] = await Promise.all([getUserOrders(), refreshProfile()]);
        setOrders(data);
        setProfileForm({
          name: profile.name,
          email: profile.email,
          password: "",
        });
        setError("");
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load your orders right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [refreshProfile]);

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const activeOrders = orders.filter((order) =>
    ["pending", "processing", "shipped"].includes(order.orderStatus),
  ).length;
  const deliveredOrders = orders.filter((order) => order.orderStatus === "delivered").length;
  const mostRecentOrder = orders[0];

  const dashboardStats = [
    {
      label: "Total Orders",
      value: orders.length,
      helper: "Orders placed from your account",
      icon: PackageIcon,
    },
    {
      label: "Total Spend",
      value: formatCurrency(totalSpent),
      helper: "Premium purchases across your account",
      icon: SparklineIcon,
    },
    {
      label: "Active Orders",
      value: activeOrders,
      helper: "Orders currently in progress",
      icon: ShieldIcon,
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      helper: "Completed orders delivered successfully",
      icon: UserCircleIcon,
    },
  ];

  const handleProfileFieldChange = (field, value) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileError("");
    setProfileStatus("");

    try {
      const payload = {
        name: profileForm.name,
        email: profileForm.email,
        ...(profileForm.password ? { password: profileForm.password } : {}),
      };

      const updatedUser = await updateProfile(payload);
      setProfileForm({
        name: updatedUser.name,
        email: updatedUser.email,
        password: "",
      });
      setProfileStatus("Your profile details were updated successfully.");
    } catch (requestError) {
      setProfileError(requestError.response?.data?.message || "Unable to update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <div className="panel-highlight grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">My Dashboard</p>
          <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">Welcome back, {user?.name}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-white/68">
            Review your latest orders, payment updates, and delivery progress from your personal OMD Hairville dashboard.
          </p>
        </div>
        <Link to="/shop" className="button-primary">
          Continue Shopping
        </Link>
      </div>

      {location.state?.success && (
        <div className="alert-success mt-8 px-5 py-4">
          {location.state.success}
        </div>
      )}

      <div className="mt-10">
        {loading ? (
          <LoadingSpinner label="Loading your orders" />
        ) : error ? (
          <div className="alert-error px-6 py-5">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-4 xl:grid-cols-4">
              {dashboardStats.map((stat) => {
                const StatIcon = stat.icon;

                return (
                  <div key={stat.label} className="luxury-panel p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                      <StatIcon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.32em] text-slate-400 dark:text-white/45">{stat.label}</p>
                    <p className="mt-3 font-display text-4xl text-slate-950 dark:text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-white/55">{stat.helper}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-8">
                <div className="luxury-panel p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                      <UserCircleIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="font-display text-3xl text-slate-950 dark:text-white">{user?.name}</p>
                      <p className="mt-1 text-sm uppercase tracking-[0.28em] text-brand-gold/80">
                        {user?.role === "admin" ? "Administrator" : "Premium Client"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="surface-card p-4">
                      <div className="flex items-center gap-3 text-slate-950 dark:text-white">
                        <MailIcon className="h-4 w-4 text-brand-gold" />
                        <span>{user?.email}</span>
                      </div>
                    </div>
                    <div className="surface-card p-4">
                      <div className="flex items-center gap-3 text-slate-950 dark:text-white">
                        <ShieldIcon className="h-4 w-4 text-brand-gold" />
                        <span>Secure JWT account access enabled</span>
                      </div>
                    </div>
                    <div className="surface-card p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400 dark:text-white/45">Recent activity</p>
                      <p className="mt-3 text-slate-950 dark:text-white">
                        {mostRecentOrder
                          ? `Last order placed on ${new Date(mostRecentOrder.createdAt).toLocaleDateString()}.`
                          : "No orders yet. Start shopping to populate your account activity."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="luxury-panel p-7">
                  <div className="flex items-center gap-3">
                    <PackageIcon className="h-5 w-5 text-brand-gold" />
                    <h2 className="font-display text-3xl text-slate-950 dark:text-white">Order Snapshot</h2>
                  </div>

                  {mostRecentOrder ? (
                    <div className="mt-6 space-y-4">
                      <div className="surface-card p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Latest Order</p>
                        <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">
                          {mostRecentOrder.paymentReference || mostRecentOrder._id.slice(-8).toUpperCase()}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <StatusBadge status={mostRecentOrder.paymentStatus} />
                          <StatusBadge status={mostRecentOrder.orderStatus} />
                        </div>
                        <p className="mt-4 text-sm text-slate-500 dark:text-white/55">
                          {mostRecentOrder.deliveryMethod === "delivery"
                            ? `Shipping to ${mostRecentOrder.shippingAddress.address}, ${mostRecentOrder.shippingAddress.city}, ${mostRecentOrder.shippingAddress.state}`
                            : "Pickup selected for this order."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <EmptyState
                      title="No orders yet"
                      message="Once you complete a purchase, your order summary and delivery status will appear here."
                      action={
                        <Link to="/shop" className="button-primary inline-flex">
                          Shop Now
                        </Link>
                      }
                    />
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="luxury-panel p-7">
                  <div className="flex items-center gap-3">
                    <PencilSquareIcon className="h-5 w-5 text-brand-gold" />
                    <h2 className="font-display text-3xl text-slate-950 dark:text-white">Profile Settings</h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-slate-600 dark:text-white/60">
                    Keep your account details current so your orders and communication stay accurate.
                  </p>

                  <form onSubmit={handleProfileSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="md:col-span-1">
                        <span className="field-label">Full Name</span>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(event) => handleProfileFieldChange("name", event.target.value)}
                          className="input-field"
                          required
                        />
                      </label>
                      <label className="md:col-span-1">
                        <span className="field-label">Email Address</span>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(event) => handleProfileFieldChange("email", event.target.value)}
                          className="input-field"
                          required
                        />
                      </label>
                    </div>

                    <PasswordField
                      label="New Password"
                      value={profileForm.password}
                      onChange={(event) => handleProfileFieldChange("password", event.target.value)}
                      placeholder="Leave blank to keep your current password"
                      hint="Only fill this in if you want to update your password."
                    />

                    {profileError && <div className="alert-error">{profileError}</div>}
                    {profileStatus && <div className="alert-success">{profileStatus}</div>}

                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="button-primary justify-center disabled:opacity-60"
                    >
                      {savingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>

                {orders.length ? (
                  <div className="luxury-panel p-7">
                    <h2 className="font-display text-3xl text-slate-950 dark:text-white">Order History</h2>
                    <div className="mt-6 space-y-5">
                      {orders.map((order) => (
                        <article key={order._id} className="rounded-[1.8rem] border border-black/10 bg-white/72 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Order Ref</p>
                              <p className="mt-2 font-display text-2xl text-slate-950 dark:text-white">
                                {order.paymentReference || order._id.slice(-8).toUpperCase()}
                              </p>
                              <p className="mt-3 text-sm text-slate-500 dark:text-white/50">
                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <StatusBadge status={order.paymentStatus} />
                              <StatusBadge status={order.orderStatus} />
                            </div>
                          </div>

                          <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {order.products.map((item) => (
                              <div key={`${order._id}-${item.product}`} className="surface-card-strong p-4">
                                <p className="text-slate-950 dark:text-white">{item.name}</p>
                                <p className="mt-2 text-sm text-slate-500 dark:text-white/50">Qty {item.quantity}</p>
                                <p className="mt-2 text-brand-gold">{formatCurrency(item.price * item.quantity)}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-slate-500 dark:text-white/55">
                              {order.deliveryMethod === "delivery"
                                ? `Delivery to ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`
                                : "Pickup selected for this order"}
                            </p>
                            <p className="text-xl font-semibold text-brand-gold">{formatCurrency(order.totalPrice)}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DashboardPage;
