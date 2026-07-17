"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, User, Mail, Phone, Building2, MapPin, Loader2, Edit2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface EditContactDrawerProps {
  trigger?: React.ReactElement<any>;
  contact: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    city?: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditContactDrawer({ trigger, contact, open, onOpenChange }: EditContactDrawerProps) {
  const router = useRouter();
  
  // If controlled externally
  const isControlled = open !== undefined && onOpenChange !== undefined;
  
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? open : internalIsOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange(newOpen);
    } else {
      setInternalIsOpen(newOpen);
    }
  };

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
    };

    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update contact");
      }

      handleOpenChange(false);
      router.refresh(); // Refresh the page to show updated info
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {trigger && !isControlled && (
        React.cloneElement(trigger, { onClick: () => handleOpenChange(true) })
      )}
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent className="w-full sm:w-[540px] max-w-[100vw] overflow-y-auto bg-white/95 backdrop-blur-xl border-l-0 shadow-2xl p-0 flex flex-col">
          <form onSubmit={onSubmit} className="flex flex-col h-full">
            
            {/* Header section with gradient line */}
            <div className="relative border-b border-gray-100 bg-gray-50/50 p-6 pt-10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-indigo-600">
                  <Edit2 className="w-6 h-6" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-semibold text-gray-900">Edit Contact</SheetTitle>
                  <p className="text-sm text-gray-500 mt-1">Update details for {contact.name}.</p>
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
                      <Input name="name" defaultValue={contact.name} required placeholder="Full name" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input name="email" defaultValue={contact.email} type="email" required placeholder="Email address" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="phone" defaultValue={contact.phone} type="tel" placeholder="+1 (555) 000-0000" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
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
                      <Input name="company" defaultValue={contact.company} placeholder="Company name" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input name="city" defaultValue={contact.city} placeholder="San Francisco, CA" className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/80 mt-auto backdrop-blur-sm">
              <Button type="button" onClick={() => handleOpenChange(false)} variant="outline" className="px-6 rounded-lg border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all active:scale-95">Cancel</Button>
              <Button type="submit" disabled={isLoading} className="px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all active:scale-95 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative flex items-center">
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </span>
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
