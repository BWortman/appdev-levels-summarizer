'use strict';

var Excel = require('exceljs');

function execute(filename) {
	console.log(`Processing '${filename}'`);

	let workbook = new Excel.Workbook();
	workbook.xlsx.readFile(filename)
	.then((wb) => {
		let worksheet = workbook.getWorksheet(1);
		console.log('row count = ' + worksheet.rowCount);
		worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
			console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
		});
	});
};

module.exports.execute = execute;