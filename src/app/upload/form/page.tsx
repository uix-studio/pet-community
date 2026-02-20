"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "@/lib/api";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const MOCK_PREVIEW = "/placeholder-3.png";

export default function UploadFormPage() {
  const [breedId, setBreedId] = useState("");
  const [description, setDescription] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(true);
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [showBreedSelect, setShowBreedSelect] = useState(false);

  const { data: breeds } = useQuery({ queryKey: ["breeds"], queryFn: fetchBreeds });
  const selectedBreed = breeds?.find((b) => b.id === breedId);

  return (
    <MobileLayout showBottomNav={false} title="새 게시물">
      <div className="flex flex-col gap-4 p-4">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={MOCK_PREVIEW}
            alt="업로드 미리보기"
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          {/* Breed select */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-neutral-black-800">
              품종 선택
            </label>
            <button
              type="button"
              onClick={() => setShowBreedSelect(!showBreedSelect)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-body-sm text-neutral-black-800"
            >
              <span className={selectedBreed ? "" : "text-gray-500"}>
                {selectedBreed?.name_ko ?? "품종을 선택하세요"}
              </span>
              <ChevronDown size={18} className="text-gray-400" />
            </button>
            {showBreedSelect && (
              <ul className="mt-1 max-h-40 overflow-auto rounded-lg border border-gray-200 bg-white py-1">
                {breeds?.map((b) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-body-sm hover:bg-gray-50"
                      onClick={() => {
                        setBreedId(b.id);
                        setShowBreedSelect(false);
                      }}
                    >
                      {b.name_ko}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-neutral-black-800">
              게시물 설명
            </label>
            <textarea
              placeholder="설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-body-sm text-neutral-black-800 placeholder:text-gray-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              rows={3}
            />
          </div>

          {/* AI analysis */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={aiAnalysis}
              onChange={(e) => setAiAnalysis(e.target.checked)}
              className="rounded border-gray-300 text-brand focus:ring-brand"
            />
            <span className="text-body-sm text-neutral-black-800">AI 분석으로 추천받기</span>
          </label>

          {/* Location */}
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              strokeWidth={1.5}
            />
            <input
              placeholder="위치 추가"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-body-sm text-neutral-black-800 placeholder:text-gray-500 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          {/* Tags */}
          <Input
            label="태그"
            placeholder="#태그"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            fullWidth
          />
        </div>
      </div>

      <div className="p-4">
        <Link href="/">
          <Button fullWidth size="lg">
            게시하기
          </Button>
        </Link>
      </div>
    </MobileLayout>
  );
}
