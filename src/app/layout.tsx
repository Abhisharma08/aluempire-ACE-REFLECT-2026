import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Follow-up Dashboard",
  description: "Contact management and follow-up automation tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-screen bg-[#f4f6fa] overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top minimal header just for the hamburger icon if on mobile, or just top padding */}
          <header className="h-14 border-b border-gray-200 bg-white flex items-center px-6 shrink-0 lg:hidden">
             {/* We can add a mobile menu button here later */}
          </header>
          <div className="flex-1 overflow-auto bg-[#f8fafc]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
