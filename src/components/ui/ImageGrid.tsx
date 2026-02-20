"use client";

import Image from "next/image";
import Link from "next/link";

interface GridItem {
  id: string;
  imageUrl: string;
  alt?: string;
  href?: string;
}

interface ImageGridProps {
  items: GridItem[];
  columns?: 2 | 3;
  gap?: "xs" | "sm" | "md";
  className?: string;
}

export function ImageGrid({
  items,
  columns = 3,
  gap = "sm",
  className = "",
}: ImageGridProps) {
  const gapClass = gap === "xs" ? "gap-0.5" : gap === "sm" ? "gap-1" : "gap-3";
  const gridClass = columns === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={`grid ${gridClass} ${gapClass} ${className}`} role="list">
      {items.map((item) => {
        const content = (
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={item.imageUrl}
              alt={item.alt ?? "게시물 이미지"}
              fill
              sizes={columns === 2 ? "50vw" : "33vw"}
              className="object-cover"
            />
          </div>
        );

        if (item.href) {
          return (
            <Link key={item.id} href={item.href} className="block" role="listitem">
              {content}
            </Link>
          );
        }
        return (
          <div key={item.id} role="listitem">
            {content}
          </div>
        );
      })}
    </div>
  );
}
