"use server";

import { findContactByToken, updateContact } from "@/lib/contacts";

export async function unsubscribeAction(token: string) {
  try {
    if (!token) {
      return { error: "Invalid unsubscribe link" };
    }

    const contact = await findContactByToken(token);
    if (!contact) {
      return { error: "Contact not found or invalid link" };
    }

    if (contact.status === "UNSUBSCRIBED" || contact.opt_in === "FALSE") {
      return { message: "You are already unsubscribed.", alreadyUnsubscribed: true };
    }

    await updateContact(contact.id, {
      opt_in: "FALSE",
      status: "UNSUBSCRIBED",
      unsubscribed_at: new Date().toISOString(),
      next_followup_at: ""
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to unsubscribe. Please try again." };
  }
}
