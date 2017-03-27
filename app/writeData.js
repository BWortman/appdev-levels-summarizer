'use strict';

const Excel = require('exceljs');

const backgroundColor = {
  alarm: 'AAFF0000',
  normalValue: 'AAFFFFFF',
  sectionHeading: 'AACFCFCF',
  sheetHeading: '00000000',
  strongValue: 'AA00FF00',
  weakValue: 'AAFFFF00'
};
const columnAddressLabels = {
  name: 'A',
  value: 'B'
};
const fontColor = {
  sheetHeading: 'FFFFFFFF'
};

function calculateBackgroundColor(itemValue) {
  switch (itemValue) {
    case null:
      return backgroundColor.sectionHeading;
    case 0:
      return backgroundColor.alarm;
    case 1:
      return backgroundColor.weakValue;
    case 2:
      return backgroundColor.normalValue;
    case 3:
      return backgroundColor.strongValue;
    default:
      throw new Error(`Unexpected value '${item.itemValue}'`);
  }
};

function calculateNameColumnAddress(rowIndex) {
  return `'${columnAddressLabels.name}${rowIndex}'`
};

function calculateValueColumnAddress(rowIndex) {
  return `'${columnAddressLabels.value}${rowIndex}'`
};

function setFill(cell, cellBackgroundColor) {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    bgColor: { argb: cellBackgroundColor }
  };
}

function addHeader(worksheet) {
  const headerRowIndex = 1;
  const headerFont = {
    bold: true,
    color: { argb: fontColor.sheetHeading }
  };

  worksheet.addRow(['Area', 'Score']);
  let nameCell = worksheet.getCell(calculateNameColumnAddress(headerRowIndex));
  let valueCell = worksheet.getCell(calculateValueColumnAddress(headerRowIndex));

  nameCell.font = headerFont;
  setFill(nameCell, backgroundColor.sheetHeading);
  valueCell.font = headerFont;
  setFill(valueCell, backgroundColor.sheetHeading);
};

function addRows(worksheet, summarizedItems) {
  summarizedItems.forEach((item, index) => {
    const rowIndex = index + 2; // Accounts for 1-based offset indexing, and the header row.
    const nameColumnAddress = calculateNameColumnAddress(rowIndex);
    const valueColumnAddress = calculateValueColumnAddress(rowIndex);
    const cellBackgroundColor = calculateBackgroundColor(item.itemValue);
    const row = [item.itemName, item.itemValue];

    worksheet.addRow(row);

    if (item.itemValue === null) {
      worksheet.mergeCells(nameColumnAddress, valueColumnAddress);
      setFill(worksheet.getCell(nameColumnAddress), cellBackgroundColor);
    } else {
      setFill(worksheet.getCell(valueColumnAddress), cellBackgroundColor);
    };
  });
};

function setColumnWidths(worksheet) {
  const nameColumnWidth = 50;
  worksheet.getColumn(columnAddressLabels.name).width = nameColumnWidth;
};

function writeData(filename, summarizedItems) {
  if (summarizedItems.length < 1) {
    console.info('No data available for output.');
    return;
  }

  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('summary');

  addHeader(worksheet);
  addRows(worksheet, summarizedItems);
  setColumnWidths(worksheet);

  return workbook.xlsx.writeFile(filename);
};

module.exports = writeData;