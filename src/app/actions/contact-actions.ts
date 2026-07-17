"use server";

import { updateContact, getContactById } from "@/lib/contacts";
import { revalidatePath } from "next/cache";

export async function pauseFollowUp(id: string) {
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return { error: "Contact not found" };
    }

    if (contact.status !== "ACTIVE") {
      return { error: "Only active contacts can be paused" };
    }

    await updateContact(id, { status: "PAUSED" });
    revalidatePath("/dashboard");
    revalidatePath("/contacts");
    revalidatePath(`/contacts/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to pause follow-up" };
  }
}

export async function resumeFollowUp(id: string) {
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return { error: "Contact not found" };
    }

    if (contact.status !== "PAUSED") {
      return { error: "Only paused contacts can be resumed" };
    }

    await updateContact(id, { status: "ACTIVE" });
    revalidatePath("/dashboard");
    revalidatePath("/contacts");
    revalidatePath(`/contacts/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to resume follow-up" };
  }
}

export async function archiveContact(id: string) {
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return { error: "Contact not found" };
    }

    await updateContact(id, { 
      status: "ARCHIVED",
      archived_at: new Date().toISOString()
    });
    
    revalidatePath("/dashboard");
    revalidatePath("/contacts");
    revalidatePath(`/contacts/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to archive contact" };
  }
}
