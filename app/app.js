'use strict';

const process = require('process');

const getFilenames = require('./getFilenames');
const parseSpreadsheet = require('./parseSpreadsheet');

function execute(argv) {
  console.log(`Source directory = '${argv.src}', target file = '${argv.targ}'`);

  getFilenames.execute(argv.src)
    .then((filenames) => {
      filenames.forEach((name) => {
        console.log(name);
        parseSpreadsheet.execute(name);
      });
    })
    .catch((err) => {
      console.error(`Processing failed for the following reason: ${err}`);
      process.exit(1);
    });
};

module.exports.execute = execute;