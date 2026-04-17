import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import { ChevronDownIcon, SearchIcon } from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { getProducts } from "../services/productService";
import { staggerContainer } from "../utils/motion";
import { categories } from "../utils/constants";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const data = await getProducts({
          search,
          category: selectedCategory === "All" ? undefined : selectedCategory,
        });
        setProducts(data);
        setError("");
      } catch (requestError) {
        setProducts([]);
        setError(requestError.response?.data?.message || "Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, selectedCategory]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams({
      ...(search ? { search } : {}),
      ...(selectedCategory !== "All" ? { category: selectedCategory } : {}),
    });
  };

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <Reveal>
        <SectionHeading
        eyebrow="Shop Luxury Hair"
        title="Discover polished textures and premium unit styles"
        description="Search the boutique, filter by category, and explore a luxury hair catalog curated for statement-making installs."
        />
      </Reveal>

      <Reveal className="mt-10 rounded-[2rem] border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.03]" delay={0.06}>
        <form onSubmit={handleSearchSubmit} className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/35" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search wigs, bundles, and textures"
                className="input-field pl-12"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="input-field appearance-none pr-11 sm:min-w-56"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-[#fbf3e7] text-slate-950 dark:bg-black dark:text-white">
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-white/45" />
            </div>
          </div>
          <button type="submit" className="button-primary w-full justify-center lg:w-auto">
            Apply Filters
          </button>
        </form>
      </Reveal>

      {loading ? (
        <LoadingSpinner label="Loading boutique products" />
      ) : error ? (
        <div className="alert-error mt-10 px-6 py-5">
          {error}
        </div>
      ) : products.length ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer(0.04, 0.08)}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="No products matched your filter"
            message="Try adjusting the search text or category to explore more of the OMD Hairville collection."
          />
        </div>
      )}
    </Container>
  );
};

export default ShopPage;
