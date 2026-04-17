import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { createRevealVariant } from "../utils/motion";
import { formatCurrency } from "../utils/currency";

const ProductCard = ({ product, index = 0 }) => (
  <motion.article
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.18 }}
    variants={createRevealVariant("fadeUp", index * 0.06)}
    className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.12)] transition-colors dark:border-white/10 dark:bg-[#0c0c0c] dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
  >
    <div className="relative h-80 overflow-hidden">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-full w-full object-cover object-top transition duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/15 to-transparent dark:from-black/65" />
      <span className="absolute left-5 top-5 rounded-full border border-brand-gold/30 bg-[#fff8ed]/88 px-3 py-1 text-xs uppercase tracking-[0.35em] text-brand-gold backdrop-blur-sm dark:bg-black/60">
        {product.category}
      </span>
    </div>
    <div className="space-y-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-slate-950 dark:text-white">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-white/65">{product.description}</p>
        </div>
        <span className="shrink-0 text-lg font-semibold text-brand-gold">
          {formatCurrency(product.price)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-white/50">
        <span>{product.length || "Premium length"}</span>
        <span>{product.texture || "Luxury texture"}</span>
      </div>
      <Link to={`/product/${product._id}`} className="button-primary w-full text-center">
        View Product
      </Link>
    </div>
  </motion.article>
);

export default ProductCard;
