export type ContactStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'FAILED' | 'NO_CONSENT' | 'UNSUBSCRIBED' | 'ARCHIVED';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  product_interest: string;
  opt_in: 'TRUE' | 'FALSE';
  opt_in_at: string;
  unsubscribed_at: string;
  unsubscribe_token: string;
  status: ContactStatus;
  current_step: string;
  next_followup_at: string;
  last_followup_at: string;
  created_at: string;
  updated_at: string;
  archived_at: string;
}
