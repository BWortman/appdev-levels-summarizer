'use strict';

const process = require('process');

const constants = require('./constants');
const getFilenames = require('./getFilenames');
const parseWorkbook = require('./parseWorkbook');
const summarizeData = require('./summarizeData');

function processFiles(filenames) {
  let promises = [];
  filenames.forEach((filename) => {
    promises.push(parseWorkbook(filename));
  });
  Promise.all(promises)
    .then((parsedItemsCollection) => {
      summarizeData(parsedItemsCollection);
    });
};

function execute(argv) {
  console.log(`Source directory = '${argv.src}', target file = '${argv.targ}'`);
  getFilenames(argv.src)
    .then(processFiles)
    .catch((err) => {
      console.error(`Processing failed for the following reason: ${err}`);
      process.exit(constants.errorProcessExitCode);
    });
};

module.exports.execute = execute;
