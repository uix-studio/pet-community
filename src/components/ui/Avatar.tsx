import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { className: "h-8 w-8", px: 32 },
  md: { className: "h-10 w-10", px: 40 },
  lg: { className: "h-14 w-14", px: 56 },
};

export function Avatar({
  src,
  alt,
  size = "md",
  className = "",
}: AvatarProps) {
  const { className: sizeClass, px } = sizeMap[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-500 ${sizeClass} ${className}`}
      aria-hidden
    >
      <span className="text-caption font-medium">
        {alt.slice(0, 1)}
      </span>
    </div>
  );
}
