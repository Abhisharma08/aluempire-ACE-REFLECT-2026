import { getContactById } from "@/lib/contacts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, Building2, MapPin, Calendar, CheckCircle2, XCircle, Clock, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactActions } from "./contact-actions-client";
import { EditContactDrawer } from "@/components/contacts/edit-contact-drawer";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

export default async function ContactDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const contact = await getContactById(id);

  if (!contact) {
    notFound();
  }

  // Determine status badge color
  const statusColors = {
    ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
    PAUSED: "bg-amber-100 text-amber-800 border-amber-200",
    COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
    FAILED: "bg-red-100 text-red-800 border-red-200",
    NO_CONSENT: "bg-gray-100 text-gray-800 border-gray-200",
    UNSUBSCRIBED: "bg-gray-100 text-gray-600 border-gray-200",
    ARCHIVED: "bg-slate-100 text-slate-800 border-slate-200",
  };

  const statusBadge = (
    <Badge className={`${statusColors[contact.status as keyof typeof statusColors] || statusColors.NO_CONSENT} shadow-none`}>
      {contact.status}
    </Badge>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <Link href="/contacts" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to contacts
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{contact.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              {statusBadge}
              <span className="text-sm text-gray-500">
                Added {new Date(contact.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <EditContactDrawer
              contact={contact}
              trigger={
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              }
            />
             <ContactActions contactId={contact.id} status={contact.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Info */}
        <Card className="md:col-span-2 shadow-sm border-gray-100">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100">
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </dt>
                <dd className="text-sm text-gray-900 font-medium">
                  {contact.email ? <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:underline">{contact.email}</a> : "—"}
                </dd>
              </div>
              
              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Phone className="w-4 h-4 mr-2" /> Phone
                </dt>
                <dd className="text-sm text-gray-900">
                  {contact.phone || "—"}
                </dd>
              </div>

              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Building2 className="w-4 h-4 mr-2" /> Company
                </dt>
                <dd className="text-sm text-gray-900">
                  {contact.company || "—"}
                </dd>
              </div>

              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <MapPin className="w-4 h-4 mr-2" /> City
                </dt>
                <dd className="text-sm text-gray-900">
                  {contact.city || "—"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Right Column: Automation State */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
            <CardTitle className="text-lg text-indigo-900">Automation State</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Consent Status</h4>
              <div className="flex items-start gap-3">
                {contact.opt_in === "TRUE" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                ) : contact.status === "UNSUBSCRIBED" ? (
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {contact.opt_in === "TRUE" 
                      ? "Opted In" 
                      : contact.status === "UNSUBSCRIBED" 
                        ? "Unsubscribed" 
                        : "No Consent Provided"}
                  </p>
                  {contact.opt_in_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      On: {new Date(contact.opt_in_at).toLocaleString()}
                    </p>
                  )}
                  {contact.unsubscribed_at && (
                    <p className="text-xs text-red-600 mt-1">
                      Unsubscribed on: {new Date(contact.unsubscribed_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Welcome Email</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {contact.current_step === "0" && contact.status !== "COMPLETED"
                      ? "Pending"
                      : "Sent ✓"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Sent On</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {contact.last_followup_at ? new Date(contact.last_followup_at).toLocaleString() : "Not yet sent"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
