"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings, LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/app/actions/auth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Contacts", href: "/contacts", icon: Users },
];

export default function Sidebar({ adminEmail = "admin@example.com" }: { adminEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0a0f25] text-white flex flex-col h-full border-r border-[#1a1f35]">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-sm shadow-indigo-900/20">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Alu Empire</h1>
          <p className="text-xs text-indigo-200/60 font-medium">Contact Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon 
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                }`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between p-3 bg-[#111832] rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-[#1a1f35]">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 bg-indigo-600">
              <AvatarFallback className="bg-indigo-600 text-white font-semibold">
                {adminEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Administrator</p>
              <p className="text-xs text-slate-400 truncate">{adminEmail}</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
        
        <form action={logout}>
          <button type="submit" className="group flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl font-medium transition-all duration-200 mt-2">
            <LogOut className="w-5 h-5 transition-colors text-slate-400 group-hover:text-red-400" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
