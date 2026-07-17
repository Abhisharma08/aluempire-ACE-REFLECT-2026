import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let cachedDoc: GoogleSpreadsheet | null = null;

export async function getGoogleDoc() {
  if (cachedDoc) {
    return cachedDoc;
  }

  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    throw new Error('Missing Google Sheets environment variables');
  }

  const auth = new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);
  
  try {
    await doc.loadInfo(); 
    cachedDoc = doc;
    return doc;
  } catch (error) {
    console.error("Failed to load Google Sheet:", error);
    throw new Error("Failed to load Google Sheet. Ensure the Service Account has Editor access to the spreadsheet.");
  }
}
