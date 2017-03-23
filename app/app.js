'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');

function getExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

function isProcessableFile(directoryName, filename) {
  let fullFilename = path.join(directoryName, filename);
  console.log(`Processing '${fullFilename}'`);
  return fs.statSync(fullFilename).isFile() && (getExtension(filename) === 'js');
};

function getFilenames(directoryName) {
  let rejectionReason = null;
  let filenames = [];
  let promise = new Promise((resolve, reject) => {
    try {
      filenames = fs.readdirSync(directoryName)
        .filter((filename) => isProcessableFile(directoryName, filename));
    }
    catch (err) {
      rejectionReason = err;
    }

    if (rejectionReason) {
      reject(rejectionReason);
    } else {
      resolve(filenames);
    }
  });

  return promise;
};

function execute(argv) {
  console.log(`Source directory = '${argv.src}', target file = '${argv.targ}'`);

  getFilenames(argv.src)
    .then((filenames) => {
      filenames.forEach((name) => { console.log(name); });
    })
    .catch((err) => {
      console.error(`Processing failed for the following reason: ${err}`);
      process.exit(1);
    });
};

module.exports.execute = execute;