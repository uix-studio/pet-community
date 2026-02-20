/**
 * API client - mock data for now; replace with real fetch to /api/* per architecture.md
 */

import type { FeedPost, FeedResponse, RankingItem, SearchParams } from "./types";

/** Feed list - mock; switch to fetch('/api/feed?...') when backend exists */
export async function fetchFeed(cursor?: string | undefined, limit = 20): Promise<FeedResponse> {
  return getMockFeed(cursor, limit);
}

/** Feed detail */
export async function fetchFeedDetail(id: string): Promise<FeedPost | null> {
  const list = getMockFeed().data;
  return list.find((p) => p.id === id) ?? null;
}

/** Monthly ranking */
export async function fetchRankingMonthly(): Promise<RankingItem[]> {
  return getMockRanking();
}

/** Search */
export async function fetchSearch(params: SearchParams): Promise<FeedResponse> {
  return getMockFeed(params.cursor, params.limit ?? 20);
}

/** Popular tags for search */
export async function fetchPopularTags(): Promise<string[]> {
  return ["강아지", "고양이", "산책", "간식", "골든리트리버", "포메라니안"];
}

/** Breeds list */
export async function fetchBreeds(): Promise<{ id: string; name_ko: string; category: string }[]> {
  return [
    { id: "golden_retriever", name_ko: "골든 리트리버", category: "dog" },
    { id: "pomeranian", name_ko: "포메라니안", category: "dog" },
    { id: "maltese", name_ko: "말티즈", category: "dog" },
    { id: "shiba", name_ko: "시바견", category: "dog" },
    { id: "persian", name_ko: "페르시안", category: "cat" },
  ];
}

export type LikedSort = "recent" | "oldest" | "likes";

/** Liked posts (my likes) */
export async function fetchLikedPosts(cursor?: string, sort: LikedSort = "recent"): Promise<FeedResponse> {
  const res = await getMockFeed(cursor, 20);
  const sorted = [...res.data].sort((a, b) => {
    if (sort === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sort === "likes")
      return (b.stats?.likes ?? 0) - (a.stats?.likes ?? 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return { ...res, data: sorted };
}

// ——— Mock data ———

const MOCK_IMAGES = [
  "/placeholder-1.png",
  "/placeholder-2.png",
  "/placeholder-3.png",
  "/placeholder-4.png",
];

function getMockFeed(cursor?: string, limit = 20): FeedResponse {
  const offset = cursor ? parseInt(cursor, 10) || 0 : 0;
  const totalMock = 24;
  const data: FeedPost[] = Array.from({ length: Math.min(limit, totalMock - offset) }, (_, i) => {
    const idx = offset + i;
    return {
      id: `post_${idx + 1}`,
      author: {
        id: `user_${idx}`,
        nickname: idx === 0 ? "냥이언니" : `멍멍이집${idx}`,
        profile_image_url: MOCK_IMAGES[idx % MOCK_IMAGES.length],
        level: (idx % 3) + 1,
      },
      images: [{ url: MOCK_IMAGES[idx % MOCK_IMAGES.length], thumbnailUrl: MOCK_IMAGES[idx % MOCK_IMAGES.length] }],
      pet: { name: idx === 0 ? "뚱냥이" : "초코", breed: "골든리트리버", age: "2세" },
      description: idx === 0 ? "안녕하세요! 혹시 저희 뚱냥이 보셨나요?" : "오늘 산책 다녀왔어요.",
      location: "서울",
      createdAt: new Date(Date.now() - idx * 3600000).toISOString(),
      stats: { views: 100 + idx * 50, likes: 10 + idx * 5 },
      likedByMe: idx % 2 === 0,
    };
  });
  const nextOffset = offset + data.length;
  return { data, nextCursor: String(nextOffset), hasMore: nextOffset < totalMock };
}

function getMockRanking(): RankingItem[] {
  return getMockFeed().data.slice(0, 6).map((post, i) => ({ rank: i + 1, post }));
}
