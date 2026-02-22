"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LikesProvider } from "@/lib/likes-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }));
  return (
    <QueryClientProvider client={client}>
      <LikesProvider>{children}</LikesProvider>
    </QueryClientProvider>
  );
}
