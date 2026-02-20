import type { ButtonHTMLAttributes } from "react";

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  selected?: boolean;
}

export function Tag({
  children,
  selected,
  className = "",
  ...props
}: TagProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-3 py-1.5 text-body-sm font-medium transition-colors ${
        selected
          ? "bg-brand text-white"
          : "border border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
