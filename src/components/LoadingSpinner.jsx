const LoadingSpinner = ({ label = "Loading" }) => (
  <div className="flex min-h-[180px] flex-col items-center justify-center gap-4 text-slate-500 dark:text-white/70">
    <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold" />
    <p className="text-sm uppercase tracking-[0.35em]">{label}</p>
  </div>
);

export default LoadingSpinner;
