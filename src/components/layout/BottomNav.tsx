"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Heart, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "홈", icon: Home },
  { href: "/search", label: "검색", icon: Search },
  { href: "/upload", label: "업로드", icon: PlusCircle },
  { href: "/like", label: "좋아요", icon: Heart },
  { href: "/notifications", label: "알림", icon: Bell },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-mobile -translate-x-1/2 items-center justify-around border-t border-gray-200 bg-white safe-bottom"
      role="navigation"
      aria-label="하단 메뉴"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex w-[72px] flex-col items-center gap-1 py-2 text-caption transition-colors ${
              active ? "text-brand" : "text-gray-500"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon
              size={24}
              strokeWidth={active ? 2.2 : 1.5}
              fill={active && href === "/like" ? "currentColor" : "none"}
            />
            <span className="font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
