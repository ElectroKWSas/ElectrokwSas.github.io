/**
 * ElectroKW S.A.S. — Backend serverless para el formulario de contacto.
 * Recibe un POST en texto plano (evita preflight CORS) con los datos del
 * formulario y los guarda como una fila nueva en la hoja "Contactos" de
 * este Google Sheet, creando la hoja y sus encabezados si no existen.
 */

const SHEET_NAME = "Contactos";

const HEADERS = [
  "Fecha",
  "Hora",
  "Nombre",
  "Apellido",
  "Correo",
  "Celular",
  "Ciudad / Barrio",
  "Tipo de servicio",
  "Mensaje",
  "IP",
  "Origen",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      data.date || "",
      data.time || "",
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.city || "",
      data.serviceType || "",
      data.message || "",
      data.ip || "",
      data.source || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}
