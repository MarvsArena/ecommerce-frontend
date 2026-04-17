import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ArrowRightIcon,
  CheckIcon,
  CrownIcon,
  DiamondIcon,
  SparklesIcon,
} from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import { getProducts } from "../services/productService";
import { staggerContainer } from "../utils/motion";
import { brandStats, categoryShowcase } from "../utils/constants";

const heroImage =
  "https://i.pinimg.com/736x/1c/6c/25/1c6c25e8f9117d157e63e730afb1b597.jpg";

const categoryIcons = [CrownIcon, DiamondIcon, SparklesIcon];

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const allProducts = await getProducts();

        const featured = allProducts.filter((p) => p.featured).slice(0, 4);

        setFeaturedProducts(featured);
        setError("");
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load featured products right now.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <Container
          as="div"
          className="grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24"
        >
          <Reveal variant="slideRight">
            <p className="text-xs uppercase tracking-[0.45em] text-brand-gold/80">
              Luxury Hair Experience
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Premium wigs tailored for polished confidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-white/65">
              OMD Hairville delivers premium units, curated textures, and
              refined finishing details for women who want their hair to feel
              intentional, elegant, and unforgettable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/shop"
                className="button-primary w-full justify-center sm:w-auto"
              >
                Shop Collection
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="button-secondary w-full justify-center sm:w-auto"
                >
                  Create Account
                </Link>
              )}
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {brandStats.map((stat) => (
                <Reveal
                  key={stat.label}
                  className="luxury-panel px-5 py-4"
                  delay={0.08}
                >
                  <p className="font-display text-3xl text-brand-gold">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-white/55">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal variant="scaleIn" className="relative" delay={0.08}>
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.28),_transparent_60%)] blur-3xl" />
            <div className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/80 shadow-[0_32px_120px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#0b0b0b] dark:shadow-[0_32px_120px_rgba(0,0,0,0.55)]">
              <img
                src={heroImage}
                alt="Premium wig model"
                className="h-full min-h-[420px] w-full object-cover sm:min-h-[520px] lg:min-h-[620px]"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-[2rem] border border-brand-gold/20 bg-[#fff7eb]/92 p-5 shadow-[0_24px_50px_rgba(15,23,42,0.16)] sm:-bottom-6 sm:-left-6 sm:right-auto sm:max-w-xs sm:p-6 dark:bg-black/90 dark:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
                Featured Edit
              </p>
              <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">
                Bone straight, deep wave, and luxury curl textures.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Collections"
            title="Curated categories for every signature look"
            description="Explore premium textures and unit styles designed for effortless luxury, from sleek straight finishes to rich voluminous curl patterns."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {categoryShowcase.map((category, index) => (
            <Reveal
              key={category.title}
              className="luxury-panel overflow-hidden p-8"
              delay={index * 0.08}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                {(() => {
                  const CategoryIcon = categoryIcons[index];
                  return <CategoryIcon className="h-4 w-4" />;
                })()}
              </div>
              <h3 className="mt-8 font-display text-3xl text-slate-950 dark:text-white">
                {category.title}
              </h3>
              <p className="mt-4 text-slate-600 dark:text-white/65">
                {category.description}
              </p>
              <Link
                to={`/shop?category=${encodeURIComponent(category.category)}`}
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-brand-gold"
              >
                Explore <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-14 sm:py-16">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Products"
            title="Boutique favorites with premium finish"
            description="These elevated picks are client favorites for their density, movement, and polished final look."
          />
          <Link
            to="/shop"
            className="button-secondary w-full justify-center sm:w-auto"
          >
            View All Products
          </Link>
        </Reveal>

        {loading ? (
          <LoadingSpinner label="Loading featured products" />
        ) : error ? (
          <div className="alert-error mt-10 px-6 py-5">{error}</div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer(0.04, 0.08)}
            className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {featuredProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </Container>

      <Container className="pb-16 pt-2 sm:pb-20">
        <Reveal className="panel-highlight grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">
              Luxury Promise
            </p>
            <h2 className="mt-4 font-display text-4xl text-slate-950 dark:text-white">
              The boutique experience, delivered online.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-white/72">
              Each unit is selected for softness, density, movement, and
              long-wear styling potential. From install day to repeat wear,
              every purchase is designed to feel premium.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Handpicked premium textures",
              "Secure checkout with Paystack",
              "Order tracking from dashboard",
              "Admin-ready inventory management",
            ].map((item) => (
              <Reveal
                key={item}
                className="surface-card-strong p-5"
                delay={0.06}
              >
                <CheckIcon className="text-brand-gold" />
                <p className="mt-4 text-slate-950 dark:text-white">{item}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
};

export default HomePage;
