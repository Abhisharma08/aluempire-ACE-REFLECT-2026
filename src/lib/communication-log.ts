import { getGoogleDoc } from "./google-sheets";
import { CommunicationLog } from "@/types/communication";

export const COMMUNICATION_LOG_HEADERS = [
  'id', 'contact_id', 'channel', 'step', 'status', 
  'recipient', 'sent_at', 'attempted_at', 'error', 'provider_message_id'
];

async function getLogSheet() {
  const doc = await getGoogleDoc();
  let sheet = doc.sheetsByTitle['Communication_Log'];
  
  if (!sheet) {
    sheet = await doc.addSheet({ title: 'Communication_Log', headerValues: COMMUNICATION_LOG_HEADERS });
  } else {
    await sheet.loadHeaderRow();
  }
  return sheet;
}

export async function getCommunicationLogs(): Promise<CommunicationLog[]> {
  try {
    const sheet = await getLogSheet();
    const rows = await sheet.getRows();
    
    return rows.map(row => {
      return {
        id: row.get('id') || '',
        contact_id: row.get('contact_id') || '',
        channel: row.get('channel') as CommunicationLog['channel'],
        step: row.get('step') || '',
        status: row.get('status') as CommunicationLog['status'],
        recipient: row.get('recipient') || '',
        sent_at: row.get('sent_at') || '',
        attempted_at: row.get('attempted_at') || '',
        error: row.get('error') || '',
        provider_message_id: row.get('provider_message_id') || ''
      };
    });
  } catch (error) {
    console.error("Error fetching communication logs:", error);
    return [];
  }
}

export async function addCommunicationLog(log: Partial<CommunicationLog>): Promise<CommunicationLog> {
  const sheet = await getLogSheet();
  
  const newRow = {
    id: log.id || crypto.randomUUID(),
    contact_id: log.contact_id || '',
    channel: log.channel || 'EMAIL',
    step: log.step || '',
    status: log.status || 'SENT',
    recipient: log.recipient || '',
    sent_at: log.sent_at || '',
    attempted_at: log.attempted_at || new Date().toISOString(),
    error: log.error || '',
    provider_message_id: log.provider_message_id || ''
  };

  await sheet.addRow(newRow);
  return newRow as CommunicationLog;
}
