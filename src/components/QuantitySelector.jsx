import { MinusIcon, PlusIcon } from "./Icons";

const QuantitySelector = ({ value, onChange, min = 1, max = 20 }) => (
  <div className="inline-flex items-center rounded-full border border-black/10 bg-white/80 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
    <button
      type="button"
      onClick={() => onChange(Math.max(min, value - 1))}
      className="flex h-9 w-10 items-center justify-center rounded-full px-2 text-slate-900 transition hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/8"
      aria-label="Decrease quantity"
    >
      <MinusIcon className="h-3 w-3 shrink-0" />
    </button>
    <span className="w-11 text-center text-sm font-medium text-slate-950 dark:text-white">{value}</span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      className="flex h-9 w-10 items-center justify-center rounded-full px-2 text-slate-900 transition hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/8"
      aria-label="Increase quantity"
    >
      <PlusIcon className="h-3 w-3 shrink-0" />
    </button>
  </div>
);

export default QuantitySelector;
