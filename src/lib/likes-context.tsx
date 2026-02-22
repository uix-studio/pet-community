"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface LikesContextValue {
  likedIds: Set<string>;
  isLiked: (id: string) => boolean;
  toggle: (id: string) => void;
}

const LikesContext = createContext<LikesContextValue | null>(null);

export function LikesProvider({ children }: { children: ReactNode }) {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const isLiked = useCallback((id: string) => likedIds.has(id), [likedIds]);

  const toggle = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <LikesContext.Provider value={{ likedIds, isLiked, toggle }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("useLikes must be used within LikesProvider");
  return ctx;
}
