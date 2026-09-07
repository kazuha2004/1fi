"use client";

import { BottomNavigation } from "@/components/layout/BottomNavigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[500px] flex-col overflow-hidden bg-[#f7f5f3]">
        <div className="flex-1 pb-24">{children}</div>
        <BottomNavigation />
      </div>
    </div>
  );
}
