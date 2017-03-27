'use strict';

const process = require('process');

const constants = require('./constants');
const getFilenames = require('./getFilenames');
const parseFiles = require('./parseFiles');
const summarizeData = require('./summarizeData');
const writeData = require('./writeData');

function execute(argv) {
  console.info(`Source directory = '${argv.src}', target file = '${argv.targ}'`);
  getFilenames(argv.src)
    .then(parseFiles)
    .then(summarizeData)
    .then((summarizedItems) => writeData(argv.targ, summarizedItems))
    .catch((err) => {
      console.error(`Processing failed for the following reason: ${err}`);
      process.exit(constants.errorProcessExitCode);
    });
};

module.exports.execute = execute;
