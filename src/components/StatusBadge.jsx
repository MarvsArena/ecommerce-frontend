const colorMap = {
  processing: "border-amber-400/20 bg-amber-500/15 text-amber-700 dark:text-amber-200",
  confirmed: "border-sky-400/20 bg-sky-500/15 text-sky-700 dark:text-sky-200",
  shipped: "border-indigo-400/20 bg-indigo-500/15 text-indigo-700 dark:text-indigo-200",
  delivered: "border-emerald-400/20 bg-emerald-500/15 text-emerald-700 dark:text-emerald-200",
  cancelled: "border-rose-400/20 bg-rose-500/15 text-rose-700 dark:text-rose-200",
  pending: "border-amber-400/20 bg-amber-500/15 text-amber-700 dark:text-amber-200",
  paid: "border-emerald-400/20 bg-emerald-500/15 text-emerald-700 dark:text-emerald-200",
  failed: "border-rose-400/20 bg-rose-500/15 text-rose-700 dark:text-rose-200",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${
      colorMap[status] || "border-black/10 bg-black/[0.04] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
