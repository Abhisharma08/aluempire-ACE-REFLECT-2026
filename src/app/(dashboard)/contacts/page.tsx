import { Menu, Search, Filter, MoreHorizontal, Download, FileUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddContactDrawer } from "@/components/contacts/add-contact-drawer";
import { EditContactDrawer } from "@/components/contacts/edit-contact-drawer";
import { ContactsToolbar } from "@/components/contacts/contacts-toolbar";
import { ContactRow } from "@/components/contacts/contact-row";
import { getContacts } from "@/lib/contacts";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const allContacts = await getContacts();
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q as string || "").toLowerCase();
  const statusFilter = resolvedParams.status as string || "All";

  // Apply search
  let contacts = allContacts;
  if (query) {
    contacts = contacts.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.toLowerCase().includes(query) ||
      c.company.toLowerCase().includes(query) ||
      c.city.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (statusFilter && statusFilter !== "All") {
    contacts = contacts.filter(c => c.status === statusFilter);
  }

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <Menu className="w-5 h-5 text-gray-500 cursor-pointer lg:hidden" />
          <h2 className="text-xl font-bold tracking-tight text-gray-900">All Contacts</h2>
        </div>
        <div className="flex items-center gap-3">
          <a href="/api/contacts/export" download>
            <Button variant="outline" className="text-gray-600 border-gray-200">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </a>
          <AddContactDrawer />
        </div>
      </header>

      <div className="flex-1 p-6 flex flex-col space-y-4">
        {/* Toolbar */}
        <ContactsToolbar />

        {/* Contacts Table */}
        <div className="border border-gray-100 rounded-xl overflow-hidden flex-1 flex flex-col bg-white">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader className="bg-gray-50/80 sticky top-0 z-10 shadow-sm">
                <TableRow>
                  <TableHead className="font-medium text-gray-600 w-[250px]">Contact</TableHead>
                  <TableHead className="font-medium text-gray-600">Company</TableHead>
                  <TableHead className="font-medium text-gray-600">Location</TableHead>
                  <TableHead className="font-medium text-gray-600">Product Interest</TableHead>
                  <TableHead className="font-medium text-gray-600">Consent</TableHead>
                  <TableHead className="font-medium text-gray-600">Status</TableHead>
                  <TableHead className="font-medium text-gray-600">Email Sent</TableHead>
                  <TableHead className="font-medium text-gray-600 whitespace-nowrap">Added Date</TableHead>
                  <TableHead className="text-right font-medium text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      {query || statusFilter !== "All" 
                        ? "No contacts match your search or filter."
                        : "No contacts found. Add one to get started!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map(contact => {
                    const colors = [
                      "bg-indigo-100 text-indigo-700", "bg-blue-100 text-blue-700", 
                      "bg-orange-100 text-orange-700", "bg-emerald-100 text-emerald-700", 
                      "bg-pink-100 text-pink-700"
                    ];
                    const charCode = (contact.name.charCodeAt(0) || 0);
                    const color = colors[charCode % colors.length];
                    const consent = contact.opt_in === 'TRUE' ? "Opted In" : contact.status === 'UNSUBSCRIBED' ? "Withdrawn" : "No Consent";
                    let added = "";
                    try {
                      added = contact.created_at ? new Date(contact.created_at).toLocaleDateString() : '—';
                    } catch(e) {
                      added = contact.created_at;
                    }
                    
                    return (
                      <ContactRow 
                        key={contact.id}
                        id={contact.id}
                        name={contact.name} 
                        email={contact.email} 
                        phone={contact.phone} 
                        initials={contact.name.charAt(0).toUpperCase()} 
                        color={color} 
                        company={contact.company} 
                        location={contact.city} 
                        productInterest={contact.product_interest}
                        consent={consent} 
                        status={contact.status} 
                        emailSent={contact.current_step !== '0' || contact.status === 'COMPLETED' ? 'Yes' : 'No'} 
                        added={added} 
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
            <div>
              Showing {contacts.length} of {allContacts.length} contacts
              {(query || statusFilter !== "All") && (
                <span className="text-indigo-600 ml-1">(filtered)</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

