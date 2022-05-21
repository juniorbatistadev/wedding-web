// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";

export default async function handler(req, res) {
  const { row, name, email } = req.query;

  //validate data
  if (!row || !name || !email) {
    res
      .status(400)
      .json({ error: "Remember to write your name and email correctly." });

    return;
  }

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

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
