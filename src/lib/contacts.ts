import { getGoogleDoc } from "./google-sheets";
import { Contact } from "@/types/contact";

// Headers required for the Contacts worksheet
export const CONTACTS_HEADERS = [
  'id', 'name', 'email', 'phone', 'company', 'city', 'product_interest',
  'opt_in', 'opt_in_at', 'unsubscribed_at', 'unsubscribe_token', 
  'status', 'current_step', 'next_followup_at', 'last_followup_at', 
  'created_at', 'updated_at', 'archived_at'
];

async function getContactsSheet() {
  const doc = await getGoogleDoc();
  let sheet = doc.sheetsByTitle['Contacts'];
  
  if (!sheet) {
    // If it doesn't exist, try to create it (if the service account has permission)
    sheet = await doc.addSheet({ title: 'Contacts', headerValues: CONTACTS_HEADERS });
  } else {
    // Ensure headers are loaded
    await sheet.loadHeaderRow();
    // If the sheet is completely empty without headers, GoogleSheet API might fail to load headers.
    // In a real prod setup, headers should be initialized. 
  }
  return sheet;
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const sheet = await getContactsSheet();
    const rows = await sheet.getRows();
    
    return rows.map(row => {
      return {
        id: row.get('id') || '',
        name: row.get('name') || '',
        email: row.get('email') || '',
        phone: row.get('phone') || '',
        company: row.get('company') || '',
        city: row.get('city') || '',
        product_interest: row.get('product_interest') || '',
        opt_in: row.get('opt_in') === 'TRUE' ? 'TRUE' : 'FALSE',
        opt_in_at: row.get('opt_in_at') || '',
        unsubscribed_at: row.get('unsubscribed_at') || '',
        unsubscribe_token: row.get('unsubscribe_token') || '',
        status: row.get('status') || 'NO_CONSENT',
        current_step: row.get('current_step') || '0',
        next_followup_at: row.get('next_followup_at') || '',
        last_followup_at: row.get('last_followup_at') || '',
        created_at: row.get('created_at') || '',
        updated_at: row.get('updated_at') || '',
        archived_at: row.get('archived_at') || ''
      } as Contact;
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    // Return empty array if sheet fails (e.g., missing credentials) so the UI doesn't crash completely.
    return [];
  }
}

export async function addContact(contact: Partial<Contact>): Promise<Contact> {
  const sheet = await getContactsSheet();
  
  const newRow = {
    id: contact.id || crypto.randomUUID(),
    name: contact.name || '',
    email: contact.email || '',
    phone: contact.phone || '',
    company: contact.company || '',
    city: contact.city || '',
    product_interest: (contact as any).product_interest || '',
    opt_in: contact.opt_in || 'FALSE',
    opt_in_at: contact.opt_in_at || '',
    unsubscribed_at: contact.unsubscribed_at || '',
    unsubscribe_token: contact.unsubscribe_token || crypto.randomUUID(),
    status: contact.status || 'NO_CONSENT',
    current_step: contact.current_step || '0',
    next_followup_at: contact.next_followup_at || '',
    last_followup_at: contact.last_followup_at || '',
    created_at: contact.created_at || new Date().toISOString(),
    updated_at: contact.updated_at || new Date().toISOString(),
    archived_at: contact.archived_at || ''
  };

  await sheet.addRow(newRow);
  return newRow as Contact;
}

export async function updateContact(id: string, updates: Partial<Contact>): Promise<boolean> {
  const sheet = await getContactsSheet();
  const rows = await sheet.getRows();
  
  const rowToUpdate = rows.find(row => row.get('id') === id);
  if (!rowToUpdate) {
    return false;
  }

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      rowToUpdate.set(key, value);
    }
  }
  
  rowToUpdate.set('updated_at', new Date().toISOString());
  await rowToUpdate.save();
  
  return true;
}

export async function findContactByEmail(email: string): Promise<Contact | null> {
  const contacts = await getContacts();
  return contacts.find(c => c.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getContactById(id: string): Promise<Contact | null> {
  const contacts = await getContacts();
  return contacts.find(c => c.id === id) || null;
}

export async function findContactByToken(token: string): Promise<Contact | null> {
  const contacts = await getContacts();
  return contacts.find(c => c.unsubscribe_token === token) || null;
}
