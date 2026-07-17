"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function AddContactDrawer({ trigger }: { trigger?: React.ReactElement }) {
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={
        trigger || (
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        )
      } />
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white border-l-0 shadow-2xl">
        <form onSubmit={onSubmit} className="flex flex-col h-full">
          <SheetHeader className="pb-6 border-b border-gray-100">
            <SheetTitle className="text-xl font-semibold">Add Contact</SheetTitle>
            <p className="text-sm text-gray-500">Add a new contact and start follow-up.</p>
          </SheetHeader>
          
          <div className="py-6 space-y-6 flex-1">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
              <Input name="name" required placeholder="Enter full name" className="bg-white border-gray-200" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
              <Input name="email" type="email" required placeholder="Enter email address" className="bg-white border-gray-200" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input name="phone" type="tel" placeholder="Enter phone number" className="bg-white border-gray-200" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input name="company" placeholder="Enter company name" className="bg-white border-gray-200" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input name="city" placeholder="Enter city" className="bg-white border-gray-200" />
            </div>

            <div className="space-y-4 pt-2">
              <label className="text-sm font-medium text-gray-900">Follow-up</label>
              <div className="flex items-start space-x-3">
                <Checkbox name="opt_in" id="follow-up" defaultChecked className="mt-1 border-indigo-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white" />
                <div>
                  <label
                    htmlFor="follow-up"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Start follow-up sequence automatically
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Contact will enter the follow-up sequence from Step 1.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium">Note (Optional)</label>
              <Textarea name="note" placeholder="Add any note about this contact" className="min-h-[100px] bg-white border-gray-200 resize-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-auto">
            <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="px-6 rounded-lg border-gray-200 bg-white hover:bg-gray-50 text-gray-700">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Add Contact
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
