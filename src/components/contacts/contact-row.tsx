"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { EditContactDrawer } from "./edit-contact-drawer";

export function ContactRow({ id, name, email, phone, initials, color, company, location, consent, status, emailSent, added }: any) {
  let statusBadge;
  if (status === "Active" || status === "ACTIVE") {
    statusBadge = <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "Paused" || status === "PAUSED") {
    statusBadge = <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "Completed" || status === "COMPLETED") {
    statusBadge = <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>{status}</Badge>;
  } else if (status === "No Consent" || status === "NO_CONSENT") {
    statusBadge = <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border border-gray-200">{status}</Badge>;
  } else {
    statusBadge = <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50 border border-red-200">{status}</Badge>;
  }

  let consentBadge = consent === "Opted In" 
    ? <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-md">{consent}</span>
    : <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">{consent}</span>;

  const emailBadge = emailSent === 'Yes'
    ? <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-md">Sent ✓</span>
    : <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">Pending</span>;

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
      <TableCell className="align-top pt-5">{emailBadge}</TableCell>
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
              <EditContactDrawer
                contact={{ id, name, email, phone, company, city: location }}
                trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit contact</DropdownMenuItem>}
              />
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
