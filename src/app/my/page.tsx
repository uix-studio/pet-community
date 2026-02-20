"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownUp } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Avatar } from "@/components/ui/Avatar";
import { ImageGrid } from "@/components/ui/ImageGrid";

const MOCK_MY_POSTS = [
  { id: "1", imageUrl: "/placeholder-3.png", href: "/detail/post_1" },
  { id: "2", imageUrl: "/placeholder-4.png", href: "/detail/post_2" },
  { id: "3", imageUrl: "/placeholder-1.png", href: "/detail/post_3" },
];

type ContentTab = "사진" | "영상" | "기록";

export default function MyPage() {
  const [contentTab, setContentTab] = useState<ContentTab>("사진");

  return (
    <MobileLayout hideHeader>
      <div className="p-4">
        {/* Pet profile */}
        <div className="flex items-center gap-4">
          <Avatar src={null} alt="송이" size="lg" />
          <div className="flex-1">
            <p className="text-body-lg font-bold text-neutral-black-800">송이</p>
            <p className="text-caption text-gray-500">송맘</p>
          </div>
          <Link
            href="/my/settings"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-body-sm text-gray-600"
          >
            수정
          </Link>
        </div>

        {/* Content tabs */}
        <div className="mt-6 flex border-b border-gray-200">
          {(["사진", "영상", "기록"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setContentTab(tab)}
              className={`flex-1 pb-2 text-center text-body-sm font-medium transition-colors ${
                contentTab === tab
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort control */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-1 text-caption text-gray-500"
          >
            최신순
            <ArrowDownUp size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Grid */}
        <div className="mt-2">
          <ImageGrid items={MOCK_MY_POSTS} columns={3} gap="xs" />
        </div>
      </div>
    </MobileLayout>
  );
}
