import Sidebar from "@/components/layout/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f4f6fa] overflow-hidden">
      <Sidebar adminEmail={process.env.ADMIN_EMAIL || "admin@example.com"} />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top minimal header just for the hamburger icon if on mobile, or just top padding */}
        <header className="h-14 border-b border-gray-200 bg-white flex items-center px-6 shrink-0 lg:hidden">
            {/* We can add a mobile menu button here later */}
        </header>
        <div className="flex-1 overflow-auto bg-[#f8fafc]">
          {children}
        </div>
      </main>
    </div>
  );
}
