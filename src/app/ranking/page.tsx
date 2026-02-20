"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Heart, Crown } from "lucide-react";
import { fetchRankingMonthly } from "@/lib/api";
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function RankingPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ranking", "monthly"],
    queryFn: fetchRankingMonthly,
  });

  return (
    <MobileLayout title="이달의 랭킹">
      <div className="p-4 space-y-4">
        {isLoading && (
          <div className="space-y-3">
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-gray-100" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="py-12 text-center text-body-sm text-red-500" role="alert">
            랭킹을 불러오지 못했어요.
          </p>
        )}

        {data != null && data.length > 0 && (
          <>
            {/* 1st place — large card */}
            <Link href={`/detail/${data[0].post.id}`} className="block">
              <div className="relative overflow-hidden rounded-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={data[0].post.images[0]?.url ?? ""}
                    alt={`1위 ${data[0].post.pet.name}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <Crown size={20} className="text-yellow-400" fill="currentColor" />
                      <span className="text-body-sm font-bold text-white">1st</span>
                    </div>
                    <p className="mt-1 text-body-lg font-bold text-white">
                      {data[0].post.pet.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-4 py-2.5">
                  <Heart size={16} className="text-brand" fill="currentColor" />
                  <span className="text-body-sm font-medium text-neutral-black-800">
                    {data[0].post.stats.likes}
                  </span>
                </div>
              </div>
            </Link>

            {/* 2nd ~ 6th — 2-column grid */}
            <div className="grid grid-cols-2 gap-3">
              {data.slice(1, 7).map((item) => (
                <Link key={item.post.id} href={`/detail/${item.post.id}`}>
                  <div className="overflow-hidden rounded-xl bg-white">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={item.post.images[0]?.url ?? ""}
                        alt={`${item.rank}위 ${item.post.pet.name}`}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-black-800/80 text-caption font-bold text-white">
                        {item.rank}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="truncate text-body-sm font-medium text-neutral-black-800">
                        {item.post.pet.name}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Heart size={14} strokeWidth={1.5} />
                        <span className="text-caption">{item.post.stats.likes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
