'use strict';

const fs = require('fs');
const path = require('path');

const constants = require('./constants');

function getExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

function getFullFilename(directoryName, filename) {
  return path.join(directoryName, filename);
}

function getFullFilenames(directoryName) {
  let filenames = fs.readdirSync(directoryName);
  filenames.forEach((value, index, array) => {
    array[index] = getFullFilename(directoryName, value);
  });
  return filenames;
}

function isProcessableFile(filename) {
  console.log(`Evaluating '${filename}'`); // eslint-disable-line no-console
  return fs.statSync(filename).isFile()
    && (getExtension(filename).toLowerCase() === constants.workbookFileExtension);
}

function getFilenames(directoryName) {
  let promise = new Promise((resolve) => {
    let filenames = getFullFilenames(directoryName).filter(isProcessableFile);
    resolve(filenames);
  });

  return promise;
}

module.exports = getFilenames;
