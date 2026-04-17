import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import { MapPinIcon, StoreIcon, TruckIcon } from "../components/Icons";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { initializePayment, verifyPayment } from "../services/paymentService";
import { formatCurrency } from "../utils/currency";

const defaultShipping = {
  phone: "",
  address: "",
  city: "",
  state: "",
};

const DELIVERY_FEE = 2500;

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [shippingAddress, setShippingAddress] = useState(defaultShipping);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const paymentItems = useMemo(
    () => cartItems.map((item) => ({ product: item._id, quantity: item.quantity })),
    [cartItems],
  );
  const deliveryFee = deliveryMethod === "delivery" ? DELIVERY_FEE : 0;
  const orderTotal = subtotal + deliveryFee;

  if (!cartItems.length) {
    return (
      <Container width="max-w-5xl" className="py-20">
        <EmptyState
          title="Your cart is empty"
          message="Add a premium unit to your cart before continuing to checkout."
        />
      </Container>
    );
  }

  const updateField = (field, value) => {
    setShippingAddress((current) => ({ ...current, [field]: value }));
  };

  const launchPaystack = (paymentSession) =>
    new Promise((resolve, reject) => {
      const paystackKey =
        import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ||
        "pk_test_a7787264502577ac3981a4278eb8debfe2d537ec";

      if (!window.PaystackPop) {
        reject(new Error("Paystack script failed to load"));
        return;
      }

      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: user.email,
        amount: Math.round(paymentSession.totalPrice * 100),
        ref: paymentSession.reference,
        access_code: paymentSession.access_code,
        callback: (response) => resolve(response.reference),
        onClose: () => reject(new Error("Payment popup closed before completion")),
      });

      handler.openIframe();
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const paymentSession = await initializePayment({
        email: user.email,
        products: paymentItems,
        deliveryMethod,
        shippingAddress,
      });

      const reference = await launchPaystack(paymentSession);

      await verifyPayment({
        reference,
        products: paymentItems,
        deliveryMethod,
        shippingAddress,
      });

      clearCart();
      navigate("/dashboard", {
        state: {
          success: "Payment successful and your order is now being processed.",
        },
      });
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Secure Checkout</p>
        <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">Complete your OMD Hairville order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <Reveal as="form" onSubmit={handleSubmit} variant="slideRight" className="luxury-panel p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-brand-gold">Delivery Method</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDeliveryMethod("pickup")}
                className={`rounded-[1.7rem] border p-5 text-left transition ${
                  deliveryMethod === "pickup"
                    ? "border-brand-gold/45 bg-brand-gold/10"
                    : "border-black/10 bg-white/72 dark:border-white/10 dark:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <StoreIcon className="h-5 w-5 text-brand-gold" />
                  <span className="font-medium text-slate-950 dark:text-white">Pickup</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-white/60">Collect your order from the store. No delivery fee.</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod("delivery")}
                className={`rounded-[1.7rem] border p-5 text-left transition ${
                  deliveryMethod === "delivery"
                    ? "border-brand-gold/45 bg-brand-gold/10"
                    : "border-black/10 bg-white/72 dark:border-white/10 dark:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <TruckIcon className="h-5 w-5 text-brand-gold" />
                  <span className="font-medium text-slate-950 dark:text-white">Delivery</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-white/60">We’ll bring it to you for {formatCurrency(DELIVERY_FEE)}.</p>
              </button>
            </div>
          </div>

          {deliveryMethod === "delivery" && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                ["address", "Address"],
                ["city", "City"],
                ["state", "State"],
                ["phone", "Phone Number"],
              ].map(([field, label]) => (
                <label key={field} className={field === "address" ? "sm:col-span-2" : ""}>
                  <span className="field-label">{label}</span>
                  <input
                    type="text"
                    value={shippingAddress[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                    className="input-field"
                    required={deliveryMethod === "delivery"}
                  />
                </label>
              ))}
            </div>
          )}

          {error && <div className="alert-error mt-6">{error}</div>}

          <button type="submit" disabled={loading} className="button-primary mt-8 w-full justify-center disabled:opacity-60">
            {loading ? "Processing..." : "Pay with Paystack"}
          </button>
        </Reveal>

        <Reveal variant="slideLeft" className="luxury-panel h-fit p-7 lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Order Summary</p>
          <div className="mt-5 flex items-center gap-3 rounded-[1.4rem] border border-black/10 bg-white/72 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
            {deliveryMethod === "delivery" ? (
              <TruckIcon className="h-4 w-4 text-brand-gold" />
            ) : (
              <StoreIcon className="h-4 w-4 text-brand-gold" />
            )}
            <span className="capitalize">{deliveryMethod}</span>
          </div>

          {deliveryMethod === "delivery" ? (
            <div className="mt-4 flex items-start gap-3 rounded-[1.4rem] border border-black/10 bg-white/72 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <span>
                {shippingAddress.address || "Delivery address will appear here"}, {shippingAddress.city || "City"},{" "}
                {shippingAddress.state || "State"}
              </span>
            </div>
          ) : null}

          <div className="mt-6 space-y-5">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img src={item.images[0]} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="text-slate-950 dark:text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-white/50">Qty {item.quantity}</p>
                </div>
                <p className="text-brand-gold">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
            <div className="flex items-center justify-between text-slate-600 dark:text-white/65">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-slate-600 dark:text-white/65">
              <span>Delivery Fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xl text-slate-950 dark:text-white">
              <span>Total</span>
              <span className="font-semibold text-brand-gold">{formatCurrency(orderTotal)}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  );
};

export default CheckoutPage;
