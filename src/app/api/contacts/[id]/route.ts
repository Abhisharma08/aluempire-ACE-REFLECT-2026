import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateContact, getContactById } from "@/lib/contacts";
import { apiRateLimiter } from "@/lib/rate-limit";

const updateContactSchema = z.object({
  name: z.string().min(1, "Name is required").trim().optional(),
  email: z.string().email("Invalid email address").toLowerCase().trim().optional(),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  city: z.string().trim().optional(),
  product_interest: z.string().trim().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    if (!apiRateLimiter.check(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { id } = await params;
    
    // Check if contact exists
    const existing = await getContactById(id);
    if (!existing) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    const body = await req.json();
    
    // Validate input
    const parseResult = updateContactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.issues }, 
        { status: 400 }
      );
    }
    
    const data = parseResult.data;
    
    const success = await updateContact(id, data);
    
    if (!success) {
      return NextResponse.json({ error: "Failed to update contact in spreadsheet" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
