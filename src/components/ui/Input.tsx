import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  fullWidth,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label != null && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-body-sm font-medium text-neutral-black-800"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-body-sm text-neutral-black-800 placeholder:text-gray-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:bg-gray-50 ${fullWidth ? "w-full" : ""} ${className}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error != null && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-caption text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
