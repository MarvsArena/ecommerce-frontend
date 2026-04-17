import { motion } from "framer-motion";

import { createRevealVariant } from "../utils/motion";

const motionElements = {
  article: motion.article,
  div: motion.div,
  form: motion.form,
  section: motion.section,
};

const Reveal = ({
  as = "div",
  variant = "fadeUp",
  delay = 0,
  className = "",
  viewport = { once: true, amount: 0.2 },
  children,
  ...props
}) => {
  const Component = motionElements[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={createRevealVariant(variant, delay)}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Reveal;
