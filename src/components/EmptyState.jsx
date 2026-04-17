const EmptyState = ({ title, message, action }) => (
  <div className="rounded-[2rem] border border-dashed border-black/10 bg-white/70 px-6 py-12 text-center dark:border-white/15 dark:bg-white/[0.03]">
    <h3 className="font-display text-2xl text-slate-950 dark:text-white">{title}</h3>
    <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-white/65">{message}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
