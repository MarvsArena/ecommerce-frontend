import { useId, useState } from "react";

import { EyeIcon, EyeOffIcon } from "./Icons";

const PasswordField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  hint,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = useId();

  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <div className="relative">
        <input
          id={inputId}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="input-field pr-13"
          placeholder={placeholder}
          required={required}
          minLength={minLength}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-black/[0.04] hover:text-slate-900 dark:text-white/55 dark:hover:bg-white/8 dark:hover:text-white"
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-controls={inputId}
        >
          {isVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </button>
      </div>
      {hint ? <span className="mt-2 block text-xs text-slate-500 dark:text-white/42">{hint}</span> : null}
    </label>
  );
};

export default PasswordField;
