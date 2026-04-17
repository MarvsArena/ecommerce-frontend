import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../components/Container";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductGallery from "../components/ProductGallery";
import QuantitySelector from "../components/QuantitySelector";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { getProduct } from "../services/productService";
import { createRevealVariant } from "../utils/motion";
import { formatCurrency } from "../utils/currency";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  const selectedImage = useMemo(
    () => product?.images?.[selectedIndex] || "",
    [product, selectedIndex],
  );

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
        setSelectedIndex(0);
        setError("");
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load this product right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?.images?.length || product.images.length <= 1 || isGalleryHovered) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSelectedIndex((current) => (current + 1) % product.images.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [isGalleryHovered, product]);

  if (loading) {
    return <LoadingSpinner label="Loading product" />;
  }

  if (!product) {
    return (
      <Container width="max-w-5xl" className="py-20 text-center">
        <p className="font-display text-4xl text-slate-950 dark:text-white">{error || "Product not found."}</p>
        <Link to="/shop" className="button-primary mt-8 inline-flex">
          Back to Shop
        </Link>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setFeedback("Product added to cart.");
  };

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
        <Reveal variant="slideRight">
          <ProductGallery
            images={product.images}
            selectedImage={selectedImage}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onHoverChange={setIsGalleryHovered}
          />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={createRevealVariant("slideLeft")}
          className="lg:sticky lg:top-28 lg:h-fit"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{product.category}</p>
          <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-white/70">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[2rem] border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div>
              <p className="text-sm text-slate-500 dark:text-white/50">Price</p>
              <p className="mt-1 text-3xl font-semibold text-brand-gold">{formatCurrency(product.price)}</p>
            </div>
            <div className="h-12 w-px bg-black/10 dark:bg-white/10" />
            <div>
              <p className="text-sm text-slate-500 dark:text-white/50">Stock</p>
              <p className="mt-1 text-lg text-slate-950 dark:text-white">{product.stock} units available</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 rounded-[2rem] border border-black/10 bg-[#fffaf1] p-6 dark:border-white/10 dark:bg-[#0d0d0d] sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-white/40">Texture</p>
              <p className="mt-2 text-slate-950 dark:text-white">{product.texture || "Premium texture"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-white/40">Length</p>
              <p className="mt-2 text-slate-950 dark:text-white">{product.length || "Custom length"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-white/40">Cap Type</p>
              <p className="mt-2 text-slate-950 dark:text-white">{product.capType || "Luxury lace cap"}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
            <button type="button" onClick={handleAddToCart} className="button-primary w-full justify-center sm:w-auto">
              Add to Cart
            </button>
            <Link to="/cart" className="button-secondary w-full justify-center sm:w-auto">
              Review Cart
            </Link>
          </div>

          {feedback && <p className="mt-4 text-sm text-brand-gold">{feedback}</p>}
        </motion.div>
      </div>
    </Container>
  );
};

export default ProductPage;
