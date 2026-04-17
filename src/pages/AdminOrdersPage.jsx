import { useEffect, useState } from "react";

import {
  ChevronDownIcon,
  ClipboardListIcon,
  MapPinIcon,
  StoreIcon,
  TruckIcon,
} from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { getAllOrders, updateOrderStatus } from "../services/orderService";
import { formatCurrency } from "../utils/currency";

const statusOptions = ["pending", "processing", "shipped", "delivered"];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchOrdersData = async () => {
    setLoading(true);

    try {
      const data = await getAllOrders();
      setOrders(data);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load orders right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      await updateOrderStatus(orderId, { orderStatus });
      setFeedback("Order status updated successfully.");
      fetchOrdersData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update order status.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Orders</p>
        <h2 className="mt-3 font-display text-4xl text-slate-950 dark:text-white">Detailed order management</h2>
      </div>

      {error && <div className="alert-error px-5 py-4">{error}</div>}
      {feedback && <div className="alert-success px-5 py-4">{feedback}</div>}

      <div className="luxury-panel p-7">
        <div className="flex items-center gap-3">
          <ClipboardListIcon className="h-5 w-5 text-brand-gold" />
          <h3 className="font-display text-3xl text-slate-950 dark:text-white">All orders</h3>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading orders" />
        ) : (
          <div className="mt-6 space-y-5">
            {orders.map((order) => (
              <article key={order._id} className="rounded-[1.8rem] border border-black/10 bg-white/72 p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="surface-card-strong p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Customer Info</p>
                        <div className="mt-4 space-y-2 text-slate-950 dark:text-white">
                          <p>{order.user?.name || "Customer"}</p>
                          <p className="text-sm text-slate-600 dark:text-white/60">{order.user?.email}</p>
                          <p className="text-sm text-slate-600 dark:text-white/60">
                            {order.shippingAddress?.phone || "No phone added"}
                          </p>
                        </div>
                      </div>

                      <div className="surface-card-strong p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Order Info</p>
                        <div className="mt-4 space-y-2 text-slate-950 dark:text-white">
                          <p>{order.products.length} item(s)</p>
                          <p className="text-sm text-slate-600 dark:text-white/60">
                            Reference: {order.paymentReference || order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-white/60">
                            Placed: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="surface-card-strong p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Products</p>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {order.products.map((item) => (
                          <div key={`${order._id}-${item.product}`} className="surface-card p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                              <div className="flex-1">
                                <p className="text-slate-950 dark:text-white">{item.name}</p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-white/55">Quantity: {item.quantity}</p>
                                <p className="mt-2 text-brand-gold">{formatCurrency(item.price * item.quantity)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="surface-card-strong p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Delivery Info</p>
                      <div className="mt-4 flex items-start gap-3 text-slate-950 dark:text-white">
                        {order.deliveryMethod === "delivery" ? (
                          <TruckIcon className="mt-0.5 h-5 w-5 text-brand-gold" />
                        ) : (
                          <StoreIcon className="mt-0.5 h-5 w-5 text-brand-gold" />
                        )}
                        <div>
                          <p className="capitalize">{order.deliveryMethod}</p>
                          {order.deliveryMethod === "delivery" ? (
                            <div className="mt-2 flex items-start gap-2 text-sm text-slate-600 dark:text-white/60">
                              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold/80" />
                              <span>
                                {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
                                {order.shippingAddress?.state}
                              </span>
                            </div>
                          ) : (
                            <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
                              Customer will collect from the store location.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="surface-card-strong p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Payment Info</p>
                      <div className="mt-4 flex items-center justify-between">
                        <StatusBadge status={order.paymentStatus === "paid" ? "paid" : "pending"} />
                        <p className="text-xl font-semibold text-brand-gold">{formatCurrency(order.totalPrice)}</p>
                      </div>
                      <p className="mt-3 text-sm text-slate-500 dark:text-white/55">Delivery fee: {formatCurrency(order.deliveryFee || 0)}</p>
                    </div>

                    <div className="surface-card-strong p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Order Status</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <StatusBadge status={order.orderStatus} />
                      </div>
                      <div className="relative mt-4">
                        <select
                          value={order.orderStatus}
                          onChange={(event) => handleStatusChange(order._id, event.target.value)}
                          className="input-field appearance-none pr-11"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status} className="bg-[#fbf3e7] text-slate-950 dark:bg-black dark:text-white">
                              {status}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-white/45" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
