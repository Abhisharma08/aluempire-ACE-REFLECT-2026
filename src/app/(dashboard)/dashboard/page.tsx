"use client";

import { Users, Play, Mail, Clock, Plus, Menu, Send, MailOpen, CornerUpLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AddContactDrawer } from "@/components/contacts/add-contact-drawer";
import { getContacts } from "@/lib/contacts";

const STATUS_DATA = [
  { name: 'Active', value: 842, color: '#10b981' },
  { name: 'Paused', value: 156, color: '#f59e0b' },
  { name: 'Completed', value: 206, color: '#3b82f6' },
  { name: 'Failed', value: 44, color: '#ef4444' }
];

export default async function Dashboard() {
  const contacts = await getContacts();
  const totalContacts = contacts.length;
  const activeContacts = contacts.filter(c => c.status === 'ACTIVE').length;
  const pausedContacts = contacts.filter(c => c.status === 'PAUSED').length;
  const completedContacts = contacts.filter(c => c.status === 'COMPLETED').length;
  const failedContacts = contacts.filter(c => c.status === 'FAILED').length;
  
  const statusData = [
    { name: 'Active', value: activeContacts, color: '#10b981' },
    { name: 'Paused', value: pausedContacts, color: '#f59e0b' },
    { name: 'Completed', value: completedContacts, color: '#3b82f6' },
    { name: 'Failed', value: failedContacts, color: '#ef4444' }
  ].filter(s => s.value > 0); // Only show non-zero in pie chart

  // Fallback for pie chart if empty
  if (statusData.length === 0) {
    statusData.push({ name: 'No Data', value: 1, color: '#e5e7eb' });
  }

  // Get most recent 5 contacts
  const recentContacts = [...contacts].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }).slice(0, 5);
  return (
    <div className="flex flex-col min-h-full">
      {/* Top Header */}
      <header className="h-14 bg-white/50 flex items-center px-6">
        <Menu className="w-5 h-5 text-gray-500 cursor-pointer" />
      </header>

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title and Action */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Good morning, Admin 👋</h2>
            <p className="text-gray-500 mt-1">Here's what's happening with your contacts today.</p>
          </div>
          <AddContactDrawer />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Contacts" 
            value={totalContacts.toString()} 
            subtitle="All time contacts" 
            icon={<Users className="w-5 h-5 text-indigo-600" />} 
            iconBg="bg-indigo-100" 
            sparklineColor="border-indigo-400"
          />
          <MetricCard 
            title="Active" 
            value={activeContacts.toString()} 
            subtitle="Currently active" 
            icon={<Play className="w-5 h-5 text-emerald-600" />} 
            iconBg="bg-emerald-100" 
            sparklineColor="border-emerald-400"
          />
          <MetricCard 
            title="Emails Sent" 
            value="3,420" 
            subtitle="All time" 
            icon={<Mail className="w-5 h-5 text-blue-600" />} 
            iconBg="bg-blue-100" 
            sparklineColor="border-blue-400"
          />
          <MetricCard 
            title="Due Today" 
            value="24" 
            subtitle="Need follow-up" 
            icon={<Clock className="w-5 h-5 text-amber-600" />} 
            iconBg="bg-amber-100" 
            sparklineColor="border-amber-400"
          />
        </div>

        {/* Recent Contacts Table */}
        <Card className="rounded-xl border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Recent Contacts</h3>
            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">View all contacts →</a>
          </div>
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-medium text-gray-500">Contact</TableHead>
                <TableHead className="font-medium text-gray-500">Company</TableHead>
                <TableHead className="font-medium text-gray-500">Status</TableHead>
                <TableHead className="font-medium text-gray-500">Follow-up</TableHead>
                <TableHead className="font-medium text-gray-500">Next Email</TableHead>
                <TableHead className="font-medium text-gray-500">Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No recent contacts.
                  </TableCell>
                </TableRow>
              ) : (
                recentContacts.map(contact => {
                  const colors = ["bg-indigo-100 text-indigo-700", "bg-blue-100 text-blue-700", "bg-orange-100 text-orange-700", "bg-emerald-100 text-emerald-700"];
                  const color = colors[(contact.name.charCodeAt(0) || 0) % colors.length];
                  
                  let added = "";
                  try {
                    added = contact.created_at ? new Date(contact.created_at).toLocaleDateString() : '—';
                  } catch(e) {
                    added = contact.created_at;
                  }

                  let nextDate = "";
                  try {
                    nextDate = contact.next_followup_at ? new Date(contact.next_followup_at).toLocaleDateString() : '—';
                  } catch(e) {
                    nextDate = contact.next_followup_at;
                  }

                  return (
                    <ContactRow 
                      key={contact.id}
                      name={contact.name} 
                      email={contact.email} 
                      initials={contact.name.charAt(0).toUpperCase()} 
                      color={color} 
                      company={contact.company} 
                      status={contact.status} 
                      step={contact.current_step === '0' ? '—' : `Step ${contact.current_step}`} 
                      next={nextDate} 
                      added={added} 
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          <Card className="rounded-xl border-gray-100 shadow-sm p-6 lg:col-span-1">
            <h3 className="font-semibold text-sm mb-4 text-gray-700">Contacts by Status</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={45}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {statusData.map(status => (
                  <div key={status.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }}></div>
                      <span className="text-gray-600">{status.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{status.value}</span>
                      <span className="text-gray-400">
                        {status.name === 'No Data' ? '' : `(${Math.round((status.value / Math.max(1, totalContacts)) * 100)}%)`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card className="rounded-xl border-gray-100 shadow-sm p-6 lg:col-span-1">
            <h3 className="font-semibold text-sm mb-4 text-gray-700">Follow-up Progress</h3>
            <div className="space-y-3">
              <ProgressRow label="Step 1" value={312} max={400} />
              <ProgressRow label="Step 2" value={284} max={400} />
              <ProgressRow label="Step 3" value={198} max={400} />
              <ProgressRow label="Step 4" value={160} max={400} />
              <ProgressRow label="Completed" value={206} max={400} isCompleted />
            </div>
          </Card>

          <Card className="rounded-xl border-gray-100 shadow-sm p-6 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="font-semibold text-sm">Upcoming Follow-ups</h3>
            </div>
            <div className="space-y-4 text-sm mt-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-red-600 font-medium">
                  <div className="w-4 h-4 rounded bg-red-100 flex items-center justify-center"><Calendar className="w-3 h-3" /></div>
                  Today
                </div>
                <span className="font-bold text-red-600">24</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center"><Calendar className="w-3 h-3 text-gray-500" /></div>
                  Tomorrow
                </div>
                <span className="font-medium text-gray-900">18</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center"><Calendar className="w-3 h-3 text-gray-500" /></div>
                  This Week
                </div>
                <span className="font-medium text-gray-900">96</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border-gray-100 shadow-sm p-6 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <Mail className="w-4 h-4 text-indigo-600" />
              <h3 className="font-semibold text-sm">Emails (This Month)</h3>
            </div>
            <div className="space-y-4 text-sm mt-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Send className="w-4 h-4 text-gray-400" />
                  Sent
                </div>
                <span className="font-medium text-gray-900">342</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <MailOpen className="w-4 h-4 text-blue-500" />
                  Opened
                </div>
                <span className="font-medium text-gray-900">128</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <CornerUpLeft className="w-4 h-4 text-emerald-500" />
                  Replied
                </div>
                <span className="font-medium text-gray-900">26</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ label, value, max, isCompleted }: any) {
  const percentage = (value / max) * 100;
  return (
    <div className="flex items-center text-xs">
      <div className="w-20 text-gray-600">{label}</div>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full mx-3 overflow-hidden">
        <div 
          className={`h-full rounded-full ${isCompleted ? 'bg-indigo-400' : 'bg-indigo-600'}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="w-8 text-right font-medium">{value}</div>
    </div>
  );
}


function MetricCard({ title, value, subtitle, icon, iconBg, sparklineColor }: any) {
  return (
    <Card className="rounded-xl border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-lg ${iconBg}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 text-right">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-right">{value}</h3>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-xs text-gray-400">{subtitle}</p>
          <div className={`w-16 h-4 border-b-2 border-r-2 rounded-br ${sparklineColor} opacity-50`}></div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactRow({ name, email, initials, color, company, status, step, next, added }: any) {
  let statusBadge;
  if (status === "ACTIVE" || status === "Active") {
    statusBadge = <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "PAUSED" || status === "Paused") {
    statusBadge = <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "UNSUBSCRIBED" || status === "NO_CONSENT") {
    statusBadge = <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border border-gray-200">{status}</Badge>;
  } else {
    statusBadge = <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>{status}</Badge>;
  }

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <Avatar className={`h-8 w-8 ${color}`}>
            <AvatarFallback className="bg-transparent">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-gray-900">{name}</p>
            <p className="text-xs text-gray-500 font-normal">{email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{company}</TableCell>
      <TableCell>{statusBadge}</TableCell>
      <TableCell className="text-gray-600">{step}</TableCell>
      <TableCell className="text-gray-600">{next}</TableCell>
      <TableCell className="text-gray-600">{added}</TableCell>
    </TableRow>
  );
}
