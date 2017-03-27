'use strict';

const Excel = require('exceljs');

function parseRows(worksheet) {
  const evalWorksheetHeaderRowCount = 3;
  const evalWorksheetNameColumnIndex = 1;
  const evalWorksheetValueColumnIndex = 2;
  let parsedItems = [];

  worksheet.eachRow({includeEmpty: true}, (row) => {
    parsedItems.push({
      itemName: row.getCell(evalWorksheetNameColumnIndex).value,
      itemValue: row.getCell(evalWorksheetValueColumnIndex).value
    });
  });
  return parsedItems.slice(evalWorksheetHeaderRowCount);
}

function parseWorkbook(filename) {
  const evalWorksheetIndex = 1;
  let workbook = new Excel.Workbook();

  console.log(`Opening '${filename}'`); // eslint-disable-line no-console
  return workbook.xlsx.readFile(filename)
    .then(() => {
      console.log(`Processing '${filename}'`); // eslint-disable-line no-console
      let worksheet = workbook.getWorksheet(evalWorksheetIndex);
      return parseRows(worksheet);
    });
}

module.exports = parseWorkbook;
