import Link from "next/link";
import { Home, Users, Settings, LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0a0f25] text-white flex flex-col h-full border-r border-[#1a1f35]">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">FollowUp</h1>
          <p className="text-xs text-slate-400">Contact Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          href="/contacts"
          className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors"
        >
          <Users className="w-5 h-5" />
          Contacts
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between p-3 bg-[#111832] rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 bg-purple-600">
              <AvatarFallback className="bg-purple-600 text-white">A</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@example.com</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
        
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
