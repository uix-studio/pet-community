"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownUp, Check, Pencil, Trash2, X, Camera } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Avatar } from "@/components/ui/Avatar";

interface MyPost {
  id: string;
  imageUrl: string;
  description: string;
}

const INITIAL_POSTS: MyPost[] = [
  { id: "1", imageUrl: "/placeholder-3.png", description: "오늘 산책 나왔어요" },
  { id: "2", imageUrl: "/placeholder-4.png", description: "간식 먹는 중" },
  { id: "3", imageUrl: "/placeholder-1.png", description: "낮잠 자는 모습" },
  { id: "4", imageUrl: "/placeholder-2.png", description: "목욕 후 뽀송뽀송" },
  { id: "5", imageUrl: "/placeholder-3.png", description: "공원에서 놀기" },
  { id: "6", imageUrl: "/placeholder-4.png", description: "새 옷 입었어요" },
];

type ContentTab = "사진" | "영상" | "기록";

export default function MyPage() {
  const [contentTab, setContentTab] = useState<ContentTab>("사진");
  const [posts, setPosts] = useState<MyPost[]>(INITIAL_POSTS);

  const [isManaging, setIsManaging] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [nickname, setNickname] = useState("송맘");
  const [petName] = useState("송이");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingDesc, setEditingDesc] = useState("");
  const editDescRef = useRef<HTMLInputElement>(null);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleDeleteSelected = () => {
    setPosts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    setIsManaging(false);
  };

  const handleDeleteSingle = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const startEditingNickname = () => {
    setNicknameInput(nickname);
    setIsEditingNickname(true);
    setTimeout(() => nicknameRef.current?.focus(), 0);
  };

  const saveNickname = () => {
    const trimmed = nicknameInput.trim();
    if (trimmed) setNickname(trimmed);
    setIsEditingNickname(false);
  };

  const cancelNickname = () => {
    setNicknameInput(nickname);
    setIsEditingNickname(false);
  };

  const startEditingPost = (post: MyPost) => {
    setEditingPostId(post.id);
    setEditingDesc(post.description);
    setTimeout(() => editDescRef.current?.focus(), 0);
  };

  const savePostEdit = () => {
    if (!editingPostId) return;
    const trimmed = editingDesc.trim();
    if (trimmed) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editingPostId ? { ...p, description: trimmed } : p))
      );
    }
    setEditingPostId(null);
  };

  const cancelPostEdit = () => {
    setEditingPostId(null);
    setEditingDesc("");
  };

  return (
    <MobileLayout hideHeader>
      <div className="p-4">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar src={null} alt={petName} size="lg" />
            <button
              type="button"
              className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white shadow-sm"
              aria-label="프로필 사진 변경"
            >
              <Camera size={11} strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1">
            <p className="text-body-lg font-bold text-neutral-black-800">{petName}</p>

            {isEditingNickname ? (
              <div className="mt-0.5 flex items-center gap-1.5">
                <input
                  ref={nicknameRef}
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveNickname();
                    if (e.key === "Escape") cancelNickname();
                  }}
                  className="w-24 rounded border border-brand px-1.5 py-0.5 text-caption text-gray-700 outline-none focus:ring-1 focus:ring-brand"
                  maxLength={12}
                />
                <button
                  type="button"
                  onClick={saveNickname}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white"
                  aria-label="닉네임 저장"
                >
                  <Check size={12} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={cancelNickname}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500"
                  aria-label="닉네임 편집 취소"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEditingNickname}
                className="mt-0.5 flex items-center gap-1 text-caption text-gray-500 transition-colors active:text-brand"
              >
                {nickname}
                <Pencil size={11} strokeWidth={1.5} />
              </button>
            )}
          </div>

          <Link
            href="/my/settings"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-body-sm text-gray-600 active:bg-gray-50"
          >
            설정
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex justify-around rounded-xl bg-gray-50 py-3">
          <div className="text-center">
            <p className="text-body-base font-bold text-neutral-black-800">{posts.length}</p>
            <p className="text-caption text-gray-500">게시물</p>
          </div>
          <div className="text-center">
            <p className="text-body-base font-bold text-neutral-black-800">128</p>
            <p className="text-caption text-gray-500">팔로워</p>
          </div>
          <div className="text-center">
            <p className="text-body-base font-bold text-neutral-black-800">56</p>
            <p className="text-caption text-gray-500">팔로잉</p>
          </div>
        </div>

        {/* Content tabs */}
        <div className="mt-6 flex border-b border-gray-200">
          {(["사진", "영상", "기록"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setContentTab(tab)}
              className={`flex-1 pb-2 text-center text-body-sm font-medium transition-colors ${
                contentTab === tab ? "border-b-2 border-brand text-brand" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Action bar */}
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (isManaging) {
                setIsManaging(false);
                setSelectedIds(new Set());
              } else {
                setIsManaging(true);
              }
            }}
            className={`rounded-full px-3 py-1 text-caption font-medium transition-colors ${
              isManaging ? "bg-brand text-white" : "bg-gray-100 text-gray-600 active:bg-gray-200"
            }`}
          >
            {isManaging ? "완료" : "관리"}
          </button>

          {isManaging && selectedIds.size > 0 && (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-caption font-medium text-red-500 active:bg-red-100"
            >
              <Trash2 size={13} strokeWidth={1.8} />
              삭제 ({selectedIds.size})
            </button>
          )}

          {!isManaging && (
            <button
              type="button"
              className="flex items-center gap-1 text-caption text-gray-500"
            >
              최신순
              <ArrowDownUp size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Photo grid */}
        {contentTab === "사진" && (
          <div className="mt-3">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Camera size={40} className="text-gray-300" strokeWidth={1.2} />
                <p className="text-body-sm text-gray-500">아직 업로드한 사진이 없어요.</p>
                <Link
                  href="/upload"
                  className="rounded-full bg-brand px-4 py-2 text-body-sm text-white active:bg-brand/90"
                >
                  첫 사진 올리기
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-0.5" role="list">
                {posts.map((post) => {
                  const isSelected = selectedIds.has(post.id);
                  const isEditing = editingPostId === post.id;

                  return (
                    <div key={post.id} className="group relative" role="listitem">
                      {/* Manage mode: select overlay */}
                      {isManaging && (
                        <button
                          type="button"
                          onClick={() => toggleSelect(post.id)}
                          className="absolute inset-0 z-10"
                          aria-label={isSelected ? "선택 해제" : "선택"}
                        >
                          <div
                            className={`absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                              isSelected
                                ? "border-brand bg-brand text-white"
                                : "border-white bg-black/20"
                            }`}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          {isSelected && (
                            <div className="absolute inset-0 rounded-lg bg-brand/10" />
                          )}
                        </button>
                      )}

                      <div
                        className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                          isSelected ? "ring-2 ring-brand" : ""
                        }`}
                      >
                        <Image
                          src={post.imageUrl}
                          alt={post.description}
                          fill
                          sizes="33vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Non-manage mode: hover/long-press actions */}
                      {!isManaging && !isEditing && (
                        <div className="absolute right-1 top-1 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => startEditingPost(post)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
                            aria-label="설명 수정"
                          >
                            <Pencil size={11} strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSingle(post.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
                            aria-label="삭제"
                          >
                            <Trash2 size={11} strokeWidth={2} />
                          </button>
                        </div>
                      )}

                      {/* Inline edit description */}
                      {isEditing && (
                        <div className="absolute inset-x-0 bottom-0 z-10 bg-black/60 p-1.5 backdrop-blur-sm">
                          <input
                            ref={editDescRef}
                            value={editingDesc}
                            onChange={(e) => setEditingDesc(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") savePostEdit();
                              if (e.key === "Escape") cancelPostEdit();
                            }}
                            className="w-full rounded bg-white/90 px-2 py-1 text-[11px] text-gray-800 outline-none"
                            maxLength={50}
                            placeholder="설명을 입력하세요"
                          />
                          <div className="mt-1 flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={savePostEdit}
                              className="rounded bg-brand px-2 py-0.5 text-[10px] font-medium text-white"
                            >
                              저장
                            </button>
                            <button
                              type="button"
                              onClick={cancelPostEdit}
                              className="rounded bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {contentTab !== "사진" && (
          <div className="flex flex-col items-center justify-center gap-2 py-16">
            <p className="text-body-sm text-gray-400">준비 중이에요.</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
