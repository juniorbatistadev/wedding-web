// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";

async function getAuthToken() {
  const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY);

  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  const authToken = await auth.getClient();
  return authToken;
}

export default async function handler(req, res) {
  const { row, name, email } = req.query;

  //validate data
  if (!row || !name || !email) {
    res
      .status(400)
      .json({ error: "Remember to write your name and email correctly." });

    return;
  }

  const auth = await getAuthToken();

  const sheets = google.sheets({ version: "v4", auth });

  const range = `Sheet1!J${row}:K${row}`;

  const body = {
    values: [["Name: " + name + " Email: " + email, "YES"]],
  };

  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: range,
    valueInputOption: "raw",
    resource: body,
  });

  if (result.data.updatedCells > 0) {
    res.status(200).json({ message: "Checked!" });
  } else {
    res.status(400).json({ error: result });
  }
}
