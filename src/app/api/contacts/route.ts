import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addContact, findContactByEmail, getContacts } from "@/lib/contacts";

// Zod schema matching the Contact Validation requirements
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  phone: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  city: z.string().trim().optional().default(""),
  opt_in: z.enum(["TRUE", "FALSE"]).default("FALSE"),
  note: z.string().trim().optional().default("")
});

export async function GET() {
  try {
    const contacts = await getContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.issues }, 
        { status: 400 }
      );
    }
    
    const data = parseResult.data;
    
    // Check for duplicate email
    const existing = await findContactByEmail(data.email);
    if (existing) {
      return NextResponse.json(
        { error: "A contact with this email already exists." }, 
        { status: 409 }
      );
    }
    
    // Build contact record
    const now = new Date().toISOString();
    const newContact = await addContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      city: data.city,
      opt_in: data.opt_in,
      opt_in_at: data.opt_in === 'TRUE' ? now : '',
      status: data.opt_in === 'TRUE' ? 'ACTIVE' : 'NO_CONSENT',
      // In a real app, calculate next_followup_at properly (e.g. +2 days)
      next_followup_at: data.opt_in === 'TRUE' ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() : '',
      // note could be saved if we add a notes column, but it wasn't strictly in the required columns.
      // We could add it, but we'll ignore it for now as per schema.
    });

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error("Error adding contact:", error);
    return NextResponse.json({ error: "Failed to add contact" }, { status: 500 });
  }
}
