'use strict';

const Excel = require('exceljs');

const constants = require('./constants');

function parseRows(worksheet) {
  let parsedItems = [];
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    parsedItems.push({
      itemName: row.getCell(constants.worksheetNameColumnIndex).value,
      itemValue: row.getCell(constants.worksheetValueColumnIndex).value
    });
  });
  return parsedItems;
};

function parseWorkbook(filename) {
  let workbook = new Excel.Workbook();
  console.log(`Opening '${filename}'`);
  return workbook.xlsx.readFile(filename)
    .then(() => {
      console.log(`Processing '${filename}'`);
      let worksheet = workbook.getWorksheet(constants.evalWorksheetIndex);
      return parseRows(worksheet);
    });
};

module.exports = parseWorkbook;
