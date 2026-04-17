const SectionHeading = ({ eyebrow, title, description, align = "left" }) => (
  <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    {eyebrow && (
      <p className="text-xs uppercase tracking-[0.4em] text-brand-gold/80">{eyebrow}</p>
    )}
    <h2 className="mt-3 font-display text-3xl text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-7 text-slate-600 dark:text-white/68">{description}</p>}
  </div>
);

export default SectionHeading;
