import { Menu, Search, Filter, MoreHorizontal, Download, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddContactDrawer } from "@/components/contacts/add-contact-drawer";
import { getContacts } from "@/lib/contacts";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <Menu className="w-5 h-5 text-gray-500 cursor-pointer lg:hidden" />
          <h2 className="text-xl font-bold tracking-tight text-gray-900">All Contacts</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-gray-600 border-gray-200">
            <FileUp className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="text-gray-600 border-gray-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <AddContactDrawer />
        </div>
      </header>

      <div className="flex-1 p-6 flex flex-col space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
          <div className="relative w-full sm:w-[350px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by name, email, phone or company..." 
              className="pl-9 bg-white border-gray-200 w-full"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="bg-white border-gray-200 text-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Status
            </Button>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="border border-gray-100 rounded-xl overflow-hidden flex-1 flex flex-col bg-white">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader className="bg-gray-50/80 sticky top-0 z-10 shadow-sm">
                <TableRow>
                  <TableHead className="font-medium text-gray-600 w-[250px]">Contact</TableHead>
                  <TableHead className="font-medium text-gray-600">Company</TableHead>
                  <TableHead className="font-medium text-gray-600">Location</TableHead>
                  <TableHead className="font-medium text-gray-600">Consent</TableHead>
                  <TableHead className="font-medium text-gray-600">Status</TableHead>
                  <TableHead className="font-medium text-gray-600">Follow-up</TableHead>
                  <TableHead className="font-medium text-gray-600 whitespace-nowrap">Added Date</TableHead>
                  <TableHead className="text-right font-medium text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No contacts found. Add one to get started!
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map(contact => {
                    // Generate a color based on the first letter of the name to keep it colorful like the mock
                    const colors = [
                      "bg-indigo-100 text-indigo-700", "bg-blue-100 text-blue-700", 
                      "bg-orange-100 text-orange-700", "bg-emerald-100 text-emerald-700", 
                      "bg-pink-100 text-pink-700"
                    ];
                    const charCode = (contact.name.charCodeAt(0) || 0);
                    const color = colors[charCode % colors.length];
                    const consent = contact.opt_in === 'TRUE' ? "Opted In" : contact.status === 'UNSUBSCRIBED' ? "Withdrawn" : "No Consent";
                    const step = contact.current_step === '0' ? '—' : `Step ${contact.current_step}`;
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
                        consent={consent} 
                        status={contact.status} 
                        step={step} 
                        added={added} 
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
            <div>Showing {contacts.length > 0 ? 1 : 0} to {contacts.length} of {contacts.length} entries</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ id, name, email, phone, initials, color, company, location, consent, status, step, added }: any) {
  let statusBadge;
  if (status === "Active") {
    statusBadge = <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "Paused") {
    statusBadge = <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "Completed") {
    statusBadge = <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "No Consent") {
    statusBadge = <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border border-gray-200">{status}</Badge>;
  } else {
    statusBadge = <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50 border border-red-200">{status}</Badge>;
  }

  let consentBadge = consent === "Opted In" 
    ? <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-md">{consent}</span>
    : <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">{consent}</span>;

  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="font-medium py-4">
        <div className="flex items-center gap-3">
          <Avatar className={`h-9 w-9 ${color}`}>
            <AvatarFallback className="bg-transparent text-sm font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold">{name}</span>
            <span className="text-xs text-gray-500 font-normal">{email}</span>
            <span className="text-xs text-gray-400 font-normal mt-0.5">{phone}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-600 align-top pt-5">{company}</TableCell>
      <TableCell className="text-gray-600 align-top pt-5">{location}</TableCell>
      <TableCell className="align-top pt-5">{consentBadge}</TableCell>
      <TableCell className="align-top pt-5">{statusBadge}</TableCell>
      <TableCell className="text-gray-600 align-top pt-5">{step}</TableCell>
      <TableCell className="text-gray-600 align-top pt-5 whitespace-nowrap">{added}</TableCell>
      <TableCell className="text-right align-top pt-5">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`/contacts/${id}`}>
                <DropdownMenuItem>View details</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Edit contact</DropdownMenuItem>
              <DropdownMenuSeparator />
              {status === "Active" ? (
                <DropdownMenuItem className="text-amber-600">Pause follow-up</DropdownMenuItem>
              ) : status === "Paused" ? (
                <DropdownMenuItem className="text-emerald-600">Resume follow-up</DropdownMenuItem>
              ) : null}
              <DropdownMenuItem className="text-red-600">Remove consent</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
