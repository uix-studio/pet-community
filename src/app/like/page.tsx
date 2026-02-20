"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Heart, ChevronRight } from "lucide-react";
import { fetchLikedPosts, fetchFeed, type LikedSort } from "@/lib/api";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ImageGrid } from "@/components/ui/ImageGrid";

const SORT_LABELS: Record<LikedSort, string> = {
  recent: "최신순",
  oldest: "오래된순",
  likes: "좋아요수",
};

export default function LikePage() {
  const [sort, setSort] = useState<LikedSort>("recent");

  const { data, isLoading, error } = useQuery({
    queryKey: ["liked", sort],
    queryFn: () => fetchLikedPosts(undefined, sort),
  });
  const { data: popular } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchFeed(),
  });

  const items =
    data?.data.map((p) => ({
      id: p.id,
      imageUrl: p.images[0]?.url ?? "",
      alt: p.pet.name,
      href: `/detail/${p.id}`,
    })) ?? [];

  const popularItems =
    popular?.data.slice(0, 6).map((p) => ({
      id: `pop-${p.id}`,
      imageUrl: p.images[0]?.url ?? "",
      alt: p.pet.name,
      href: `/detail/${p.id}`,
    })) ?? [];

  return (
    <MobileLayout
      title="내가 좋아하는 사진"
      headerRight={
        <Link href="/like/all" className="flex items-center text-caption text-gray-500">
          더보기
          <ChevronRight size={14} />
        </Link>
      }
    >
      <div className="p-4">
        {/* 필터: 최신순 / 오래된순 / 좋아요수 */}
        <div className="mb-4 flex gap-2">
          {(["recent", "oldest", "likes"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={`rounded-full px-3 py-1.5 text-body-sm ${
                sort === s ? "bg-brand text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {SORT_LABELS[s]}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
        )}

        {error && (
          <p className="py-12 text-center text-body-sm text-red-500" role="alert">
            목록을 불러오지 못했어요.
          </p>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Heart size={40} className="text-gray-300" strokeWidth={1.2} />
            <p className="text-body-sm text-gray-500">좋아요한 게시물이 없어요.</p>
          </div>
        )}

        {items.length > 0 && <ImageGrid items={items} columns={2} gap="md" />}
      </div>

      {/* Popular photos section */}
      {popularItems.length > 0 && (
        <div className="border-t border-gray-100 p-4">
          <h2 className="text-body-sm font-bold text-neutral-black-800">인기 사진</h2>
          <p className="mt-1 text-caption text-gray-500">
            멍냥멍냥에서 인기있는 사진 추천드려요.
          </p>
          <div className="mt-3">
            <ImageGrid items={popularItems} columns={2} gap="md" />
          </div>
        </div>
      )}
    </MobileLayout>
  );
}
