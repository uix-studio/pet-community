"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "@/lib/api";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ImageGrid } from "@/components/ui/ImageGrid";

function SearchResultContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const breed = searchParams.get("breed") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", q, breed],
    queryFn: () => fetchSearch({ q: q || undefined, breed: breed || undefined, limit: 30 }),
  });

  const items =
    data?.data.map((p) => ({
      id: p.id,
      imageUrl: p.images[0]?.url ?? "",
      alt: p.pet.name,
      href: `/detail/${p.id}`,
    })) ?? [];

  return (
    <MobileLayout
      title="검색 결과"
      headerLeft={
        <Link href="/search" className="p-2 text-neutral-black-800" aria-label="뒤로">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </Link>
      }
    >
      <div className="p-4">
        {(q || breed) && (
          <p className="mb-4 text-body-sm text-gray-600">
            {q ? `"${q}"` : breed} 검색 결과
          </p>
        )}

        {isLoading && (
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        )}

        {error && (
          <p className="py-12 text-center text-body-sm text-red-500" role="alert">
            검색 결과를 불러오지 못했어요.
          </p>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Search size={40} className="text-gray-300" strokeWidth={1.2} />
            <p className="text-body-sm text-gray-500">검색 결과가 없어요.</p>
          </div>
        )}

        {items.length > 0 && <ImageGrid items={items} columns={3} />}
      </div>
    </MobileLayout>
  );
}

export default function SearchResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-body-sm text-gray-500">
          로딩 중...
        </div>
      }
    >
      <SearchResultContent />
    </Suspense>
  );
}
