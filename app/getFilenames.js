'use strict';

const fs = require('fs');
const path = require('path');

function getExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

function getFullFilename(directoryName, filename) {
  return path.join(directoryName, filename);
};

function isProcessableFile(directoryName, filename) {
  let fullFilename = getFullFilename(directoryName, filename);
  console.log(`Evaluating '${fullFilename}'`);
  return fs.statSync(fullFilename).isFile() && (getExtension(filename) === 'xlsx');
};

function getFilenames(directoryName) {
  let rejectionReason = null;
  let fullFilenames = [];
  let promise = new Promise((resolve, reject) => {
    try {
      fullFilenames = (() => {
        let filenames = fs.readdirSync(directoryName)
          .filter((filename) => isProcessableFile(directoryName, filename));
        filenames.forEach((value, index, array) => {
          array[index] = getFullFilename(directoryName, value);
        });
        return filenames;
      })();
    }
    catch (err) {
      rejectionReason = err;
    }

    if (rejectionReason) {
      reject(rejectionReason);
    } else {
      resolve(fullFilenames);
    }
  });

  return promise;
};

module.exports.execute = getFilenames;