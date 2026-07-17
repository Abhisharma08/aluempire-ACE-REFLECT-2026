"use client";

import { Button } from "@/components/ui/button";
import { pauseFollowUp, resumeFollowUp, archiveContact } from "@/app/actions/contact-actions";
import { PauseCircle, PlayCircle, Archive, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function ContactActions({ contactId, status }: { contactId: string, status: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePause = () => {
    startTransition(async () => {
      await pauseFollowUp(contactId);
    });
  };

  const handleResume = () => {
    startTransition(async () => {
      await resumeFollowUp(contactId);
    });
  };

  const handleArchive = () => {
    startTransition(async () => {
      await archiveContact(contactId);
      router.push("/contacts"); // Redirect back to list after archiving
    });
  };

  return (
    <div className="flex items-center gap-2">
      {status === "ACTIVE" && (
        <Button 
          onClick={handlePause} 
          disabled={isPending}
          variant="outline" 
          className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
        >
          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PauseCircle className="w-4 h-4 mr-2" />}
          Pause Automation
        </Button>
      )}

      {status === "PAUSED" && (
        <Button 
          onClick={handleResume} 
          disabled={isPending}
          variant="outline" 
          className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
        >
          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PlayCircle className="w-4 h-4 mr-2" />}
          Resume Automation
        </Button>
      )}

      {status !== "ARCHIVED" && (
        <Button 
          onClick={handleArchive} 
          disabled={isPending}
          variant="outline" 
          className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
        >
          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Archive className="w-4 h-4 mr-2" />}
          Archive
        </Button>
      )}
    </div>
  );
}
