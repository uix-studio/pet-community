"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Share2, Heart, MapPin, PawPrint, UserPlus, UserCheck } from "lucide-react";
import { fetchFeedDetail } from "@/lib/api";
import { useLikes } from "@/lib/likes-context";

function formatDate(iso: string) {
  const d = new Date(iso);
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["feed", id],
    queryFn: () => fetchFeedDetail(id),
  });

  const { isLiked, toggle } = useLikes();
  const [isFollowing, setIsFollowing] = useState(false);
  const liked = post ? isLiked(post.id) : false;

  return (
    <div className="mx-auto min-h-dvh max-w-mobile bg-white">
      {isLoading && (
        <div className="space-y-4 p-4">
          <div className="aspect-[4/3] animate-pulse rounded-xl bg-gray-100" />
          <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
        </div>
      )}

      {error && (
        <p className="py-12 text-center text-body-sm text-red-500" role="alert">
          게시물을 불러오지 못했어요.
        </p>
      )}

      {post != null && (
        <article>
          {/* Fullbleed image with overlay actions */}
          <div className="relative w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-b-2xl bg-gray-100">
              <Image
                src={post.images[0]?.url ?? ""}
                alt={post.pet.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />

              {/* Back button overlay */}
              <button
                type="button"
                onClick={() => router.back()}
                className="absolute left-4 top-12 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
                aria-label="뒤로"
              >
                <ArrowLeft size={20} strokeWidth={2} />
              </button>

              {/* Top-right overlay actions */}
              <div className="absolute right-4 top-12 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
                  aria-label="공유"
                >
                  <Share2 size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Heart overlay */}
              <button
                type="button"
                onClick={() => toggle(post.id)}
                className={`absolute bottom-4 right-4 rounded-full p-2 backdrop-blur-sm transition-transform active:scale-110 ${
                  liked ? "bg-brand text-white" : "bg-black/30 text-white"
                }`}
                aria-label={liked ? "좋아요 취소" : "좋아요"}
              >
                <Heart
                  size={22}
                  fill={liked ? "currentColor" : "none"}
                  strokeWidth={2}
                />
              </button>

              {/* Swipe dots */}
              {post.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {post.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full ${
                        idx === 0 ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info section */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-body-base font-bold text-brand">
                {post.pet.name}
                <PawPrint size={14} className="text-brand" />
              </span>
              <span className="text-caption text-gray-500">{formatDate(post.createdAt)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-body-sm text-gray-600">{post.author.nickname}</span>
                <button
                  type="button"
                  onClick={() => setIsFollowing((prev) => !prev)}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                    isFollowing
                      ? "bg-gray-100 text-gray-600"
                      : "bg-brand text-white"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck size={12} strokeWidth={2} />
                      팔로잉
                    </>
                  ) : (
                    <>
                      <UserPlus size={12} strokeWidth={2} />
                      팔로우
                    </>
                  )}
                </button>
              </div>
              {post.location != null && post.location !== "" && (
                <span className="flex items-center gap-0.5 text-caption text-gray-500">
                  <MapPin size={12} strokeWidth={1.5} />
                  {post.location}
                </span>
              )}
            </div>

            {/* Description card */}
            {post.description && (
              <div className="mt-4 rounded-lg border border-gray-200 p-3">
                <p className="text-body-sm text-neutral-black-800">{post.description}</p>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
}
