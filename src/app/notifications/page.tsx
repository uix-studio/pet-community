"use client";

import { Bell } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function NotificationsPage() {
  return (
    <MobileLayout title="알림">
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Bell size={40} className="text-gray-300" strokeWidth={1.2} />
        <p className="text-body-sm text-gray-500">아직 알림이 없어요.</p>
      </div>
    </MobileLayout>
  );
}
