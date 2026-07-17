import { getContacts } from "@/lib/contacts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contacts = await getContacts();

    // CSV headers
    const headers = ["Name", "Email", "Phone", "Company", "City", "Consent", "Status", "Email Sent", "Added"];

    // Build CSV rows
    const rows = contacts.map(contact => {
      const consent = contact.opt_in === "TRUE" ? "Opted In" : contact.status === "UNSUBSCRIBED" ? "Withdrawn" : "No Consent";
      const emailSent = contact.current_step !== "0" || contact.status === "COMPLETED" ? "Yes" : "No";
      let added = "";
      try {
        added = contact.created_at ? new Date(contact.created_at).toLocaleDateString() : "";
      } catch {
        added = contact.created_at;
      }

      return [
        escapeCsv(contact.name),
        escapeCsv(contact.email),
        escapeCsv(contact.phone),
        escapeCsv(contact.company),
        escapeCsv(contact.city),
        consent,
        contact.status,
        emailSent,
        added
      ].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="alu-empire-contacts-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to export contacts" }, { status: 500 });
  }
}

function escapeCsv(value: string): string {
  if (!value) return "";
  // Wrap in quotes if the value contains commas, quotes, or newlines
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
