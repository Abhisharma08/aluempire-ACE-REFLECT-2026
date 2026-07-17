export type CommunicationStatus = 'SENT' | 'FAILED';
export type CommunicationChannel = 'EMAIL' | 'SMS';

export interface CommunicationLog {
  id: string;
  contact_id: string;
  channel: CommunicationChannel;
  step: string;
  status: CommunicationStatus;
  recipient: string;
  sent_at: string;
  attempted_at: string;
  error: string;
  provider_message_id: string;
}
