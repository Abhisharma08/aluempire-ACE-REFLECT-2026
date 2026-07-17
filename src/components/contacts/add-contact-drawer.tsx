"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, UserPlus, User, Mail, Phone, Building2, MapPin, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function AddContactDrawer({ trigger }: { trigger?: React.ReactElement<any> }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      city: formData.get("city") as string,
      opt_in: formData.get("opt_in") === "on" ? "TRUE" : "FALSE",
      note: formData.get("note") as string,
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to add contact");
      }

      setIsOpen(false);
      router.refresh(); // Refresh the page to show the new contact
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger, { onClick: () => setIsOpen(true) })
      ) : (
        <Button onClick={() => setIsOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm shadow-indigo-200 transition-all active:scale-95">
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      )}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:w-[540px] max-w-[100vw] overflow-y-auto bg-white/95 backdrop-blur-xl border-l-0 shadow-2xl p-0 flex flex-col">
        <form onSubmit={onSubmit} className="flex flex-col h-full">
          
          {/* Header section with gradient line */}
          <div className="relative border-b border-gray-100 bg-gray-50/50 p-6 pt-10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-indigo-600">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <SheetTitle className="text-xl font-semibold text-gray-900">New Contact</SheetTitle>
                <p className="text-sm text-gray-500 mt-1">Add a new lead to your dashboard and automate their follow-up.</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-8 flex-1">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shrink-0"></div>
                {error}
              </div>
            )}
            
            {/* Section 1: Personal Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Personal Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="name" required placeholder="Full name" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="email" type="email" required placeholder="Email address" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input name="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100"></div>

            {/* Section 2: Work & Location */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Work & Location</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="company" placeholder="Company name" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="city" placeholder="San Francisco, CA" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section 3: Automation */}
            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-4 rounded-xl shadow-sm relative overflow-hidden">
              <Sparkles className="absolute -right-4 -top-4 w-20 h-20 text-indigo-500/10 rotate-12" />
              <div className="relative z-10 flex items-start space-x-3">
                <Checkbox name="opt_in" id="follow-up" defaultChecked className="mt-0.5 w-5 h-5 border-indigo-600 data-checked:bg-indigo-600 data-checked:text-white rounded shadow-sm" />
                <div>
                  <label
                    htmlFor="follow-up"
                    className="block text-sm font-semibold text-indigo-900 leading-none cursor-pointer"
                  >
                    Start automated follow-up
                  </label>
                  <p className="text-xs text-indigo-600/70 mt-1.5 leading-relaxed">
                    Contact will immediately enter the follow-up sequence from Step 1.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Notes */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
              <Textarea name="note" placeholder="Add any extra context about this contact..." className="min-h-[100px] bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg resize-none p-3" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/80 mt-auto backdrop-blur-sm">
            <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="px-6 rounded-lg border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all active:scale-95">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all active:scale-95 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative flex items-center">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create Contact
              </span>
            </Button>
          </div>
        </form>
      </SheetContent>
      </Sheet>
    </>
  );
}
