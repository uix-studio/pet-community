"use client";

import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  title?: string;
  headerCenter?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  hideHeader?: boolean;
}

export function MobileLayout({
  children,
  showBottomNav = true,
  title,
  headerCenter,
  headerRight,
  headerLeft,
  hideHeader = false,
}: MobileLayoutProps) {
  const hasHeader =
    !hideHeader &&
    (title !== undefined ||
      headerCenter !== undefined ||
      headerLeft !== undefined ||
      headerRight !== undefined);

  return (
    <div className="mx-auto flex min-h-dvh max-w-mobile flex-col bg-white">
      {hasHeader && (
        <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {headerLeft}
            {title != null && headerCenter == null && (
              <h1 className="truncate text-body-base font-bold text-neutral-black-800">
                {title}
              </h1>
            )}
          </div>
          {headerCenter != null && (
            <div className="absolute inset-x-0 flex justify-center pointer-events-none">
              <div className="pointer-events-auto">{headerCenter}</div>
            </div>
          )}
          {headerRight != null && (
            <div className="shrink-0">{headerRight}</div>
          )}
        </header>
      )}
      <main className="flex-1 pb-16" id="main-content">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
