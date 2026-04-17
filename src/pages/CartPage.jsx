import { Link } from "react-router-dom";

import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import { TrashIcon } from "../components/Icons";
import QuantitySelector from "../components/QuantitySelector";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

const CartPage = () => {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();

  if (!cartItems.length) {
    return (
      <Container width="max-w-6xl" className="py-20">
        <EmptyState
          title="Your cart is currently empty"
          message="Start with one of our premium units and build your order from the boutique collection."
          action={
            <Link to="/shop" className="button-primary inline-flex">
              Explore Products
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {cartItems.map((item) => (
            <article
              key={item._id}
              className="grid gap-5 rounded-[2rem] border border-black/10 bg-white/72 p-5 dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-[150px_1fr]"
            >
              <img src={item.images[0]} alt={item.name} className="h-48 w-full rounded-[1.5rem] object-cover sm:h-full" />
              <div className="flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{item.category}</p>
                    <h2 className="mt-2 font-display text-3xl text-slate-950 dark:text-white">{item.name}</h2>
                    <p className="mt-3 text-slate-600 dark:text-white/60">{item.texture || item.description}</p>
                  </div>
                  <p className="text-2xl font-semibold text-brand-gold">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item._id, value)}
                    max={item.stock}
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCart(item._id)}
                    className="inline-flex items-center gap-2 text-sm text-rose-700 transition hover:text-rose-800 dark:text-rose-300 dark:hover:text-rose-200"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="luxury-panel h-fit p-7 lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Order Summary</p>
          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between text-slate-600 dark:text-white/65">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-white/65">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-black/10 pt-5 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-lg text-slate-950 dark:text-white">Total</span>
                <span className="text-2xl font-semibold text-brand-gold">{formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>

          <Link to="/checkout" className="button-primary mt-8 w-full text-center">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </Container>
  );
};

export default CartPage;
