"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, LogOut, Shield, FileText } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function MySettingsPage() {
  return (
    <MobileLayout
      showBottomNav={false}
      title="설정"
      headerLeft={
        <Link href="/my" className="p-2 text-neutral-black-800" aria-label="뒤로">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </Link>
      }
    >
      <div className="space-y-6 p-4">
        <section aria-labelledby="settings-account">
          <h2 id="settings-account" className="mb-2 text-caption font-semibold text-gray-500">
            계정
          </h2>
          <div className="overflow-hidden rounded-xl bg-white">
            <Link
              href="/login"
              className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-gray-500" strokeWidth={1.5} />
                <span className="text-body-sm text-neutral-black-800">로그아웃</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href="/my"
              className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-gray-500" strokeWidth={1.5} />
                <span className="text-body-sm text-neutral-black-800">개인정보처리방침</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href="/my"
              className="flex items-center justify-between px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-500" strokeWidth={1.5} />
                <span className="text-body-sm text-neutral-black-800">이용약관</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          </div>
        </section>

        <p className="text-center text-caption text-gray-400">
          멍냥멍냥 v1.0.0
        </p>
      </div>
    </MobileLayout>
  );
}
