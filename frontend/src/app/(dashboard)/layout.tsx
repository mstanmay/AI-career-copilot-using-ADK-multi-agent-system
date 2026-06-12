"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { VoiceAssistant } from "@/components/shared/VoiceAssistant";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="h-screen flex overflow-hidden" style={{ background: "var(--bg-app)" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
        <CommandPalette />
        <VoiceAssistant />
      </div>
    </AuthGuard>
  );
}
