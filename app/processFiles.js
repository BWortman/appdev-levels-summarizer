'use strict';

const parseWorkbook = require('./parseWorkbook');
const summarizeData = require('./summarizeData');

function processFiles(filenames) {
  const filenameCount = filenames.length;
  if (filenameCount < 1) {
    return;
  }

  let parsedItemsCollection = [];
  let promiseChain = parseWorkbook(filenames[0]);
  for (let i = 1; i < filenameCount; i += 1) {
    (((index) => {
      promiseChain = promiseChain
        .then((parsedItems) => {
          parsedItemsCollection.push(parsedItems);
          return parseWorkbook(filenames[index]);
        });
    })(i));
  };

  promiseChain = promiseChain
    .then((parsedItems) => {
      parsedItemsCollection.push(parsedItems);
      summarizeData(parsedItemsCollection);
    });
};

module.exports = processFiles;