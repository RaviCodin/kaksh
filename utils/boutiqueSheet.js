// Google sheet npm package
const { GoogleSpreadsheet } = require("google-spreadsheet");
const fs = require("fs");
const RESPONSES_SHEET_ID = "1QA7eixd_I5qIjoTKADHqR9-33ZMWTZVH_9EGsQN1KTk";

const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const CREDENTIALS = require("./fragrensFile.json");

const sheetAdd = async (row) => {
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await doc.loadInfo();

  let sheet = doc.sheetsByIndex[1];

  await sheet.addRow(row);
};
module.exports = sheetAdd;
