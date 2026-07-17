"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useEffect, useState } from "react";

const STATUS_OPTIONS = ["All", "ACTIVE", "PAUSED", "COMPLETED", "FAILED", "NO_CONSENT", "UNSUBSCRIBED", "ARCHIVED"];

export function ContactsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const currentStatus = searchParams.get("status") || "All";
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(currentQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  function updateParams(q: string | null, status: string | null) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status && status !== "All") params.set("status", status);
    const qs = params.toString();
    router.push(`/contacts${qs ? `?${qs}` : ""}`);
  }

  function handleSearch(value: string) {
    setSearchValue(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams(value || null, currentStatus);
    }, 300);
  }

  function handleStatusChange(status: string) {
    updateParams(searchValue || null, status);
    setShowFilters(false);
  }

  function clearAll() {
    setSearchValue("");
    router.push("/contacts");
  }

  const hasFilters = currentQuery || currentStatus !== "All";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
      <div className="relative w-full sm:w-[350px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, email, phone or company..."
          className="pl-9 bg-white border-gray-200 w-full"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto items-center">
        <div className="relative">
          <Button
            variant="outline"
            className={`bg-white border-gray-200 text-gray-700 ${currentStatus !== "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {currentStatus !== "All" ? currentStatus : "Filter by Status"}
          </Button>
          {showFilters && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
              {STATUS_OPTIONS.map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    currentStatus === status
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {status === "All" ? "All Contacts" : status}
                </button>
              ))}
            </div>
          )}
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-gray-500 hover:text-gray-800">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
