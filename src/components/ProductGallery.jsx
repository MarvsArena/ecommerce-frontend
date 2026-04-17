import { AnimatePresence, motion } from "framer-motion";

const ProductGallery = ({ images, selectedImage, selectedIndex, onSelect, onHoverChange }) => (
  <div className="space-y-4" onMouseEnter={() => onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
    <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 dark:border-white/10 dark:bg-[#0b0b0b]">
      <div className="relative h-[320px] sm:h-[390px] lg:h-[460px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt="Selected product"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>
      </div>
    </div>
    <div className="flex gap-3 overflow-x-auto pb-1">
      {images.map((image, index) => (
        <button
          type="button"
          key={image}
          onClick={() => onSelect(index)}
          className={`shrink-0 overflow-hidden rounded-2xl border transition ${
            selectedIndex === index
              ? "border-brand-gold shadow-[0_0_24px_rgba(212,175,55,0.22)]"
              : "border-black/10 dark:border-white/10"
          }`}
        >
          <img src={image} alt="Product thumbnail" className="h-18 w-18 object-cover object-top sm:h-20 sm:w-20" />
        </button>
      ))}
    </div>
  </div>
);

export default ProductGallery;
