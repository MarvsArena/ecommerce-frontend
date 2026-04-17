const ease = [0.22, 1, 0.36, 1];

const transitionFor = (delay = 0, duration = 0.55) => ({
  duration,
  delay,
  ease,
});

export const createRevealVariant = (type = "fadeUp", delay = 0) => {
  switch (type) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: transitionFor(delay, 0.5) },
      };
    case "slideLeft":
      return {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: transitionFor(delay) },
      };
    case "slideRight":
      return {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: transitionFor(delay) },
      };
    case "scaleIn":
      return {
        hidden: { opacity: 0, scale: 0.96 },
        visible: { opacity: 1, scale: 1, transition: transitionFor(delay, 0.5) },
      };
    case "fadeUp":
    default:
      return {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: transitionFor(delay) },
      };
  }
};

export const staggerContainer = (delayChildren = 0.06, staggerChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});
