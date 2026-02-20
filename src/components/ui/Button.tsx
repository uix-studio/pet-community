import type { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "kakao"
  | "naver"
  | "google";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-hover active:opacity-90",
  secondary:
    "bg-gray-100 text-neutral-black-800 hover:bg-gray-200",
  outline:
    "border border-brand text-brand bg-transparent hover:bg-brand/5",
  ghost: "text-gray-700 hover:bg-gray-50",
  kakao: "bg-social-kakao text-neutral-black-900 hover:brightness-95",
  naver: "bg-social-naver text-white hover:brightness-95",
  google:
    "bg-white border border-gray-300 text-neutral-black-800 hover:bg-gray-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "py-2 px-3 text-body-sm rounded-lg",
  md: "py-3 px-4 text-body-base rounded-xl",
  lg: "py-4 px-6 text-body-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
