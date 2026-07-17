"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React from "react";

export function AddContactDrawer({ trigger }: { trigger?: React.ReactElement }) {
  return (
    <Sheet>
      <SheetTrigger render={
        trigger || (
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        )
      } />
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white border-l-0 shadow-2xl">
        <SheetHeader className="pb-6 border-b border-gray-100">
          <SheetTitle className="text-xl font-semibold">Add Contact</SheetTitle>
          <p className="text-sm text-gray-500">Add a new contact and start follow-up.</p>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
            <Input placeholder="Enter full name" className="bg-white border-gray-200" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
            <Input type="email" placeholder="Enter email address" className="bg-white border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input type="tel" placeholder="Enter phone number" className="bg-white border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input placeholder="Enter company name" className="bg-white border-gray-200" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input placeholder="Enter city" className="bg-white border-gray-200" />
          </div>

          <div className="space-y-4 pt-2">
            <label className="text-sm font-medium text-gray-900">Follow-up</label>
            <div className="flex items-start space-x-3">
              <Checkbox id="follow-up" defaultChecked className="mt-1 border-indigo-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white" />
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
            <Textarea placeholder="Add any note about this contact" className="min-h-[100px] bg-white border-gray-200 resize-none" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-auto">
          <Button variant="outline" className="px-6 rounded-lg border-gray-200 bg-white hover:bg-gray-50 text-gray-700">Cancel</Button>
          <Button className="px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">Add Contact</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
