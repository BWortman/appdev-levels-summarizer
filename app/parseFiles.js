'use strict';

const parseWorkbook = require('./parseWorkbook');

function parseFiles(filenames) {
  let parsedItemsCollection = [];
  let outerPromise = new Promise((resolve) => {
    const filenameCount = filenames.length;
    if (filenameCount < 1) {
      resolve(parsedItemsCollection);
      return;
    }

    let promiseChain = parseWorkbook(filenames[0]);
    for (let i = 1; i < filenameCount; i += 1) {
      (((index) => {
        promiseChain = promiseChain
          .then((parsedItems) => {
            parsedItemsCollection.push(parsedItems);
            return parseWorkbook(filenames[index]);
          });
      })(i));
    }

    promiseChain = promiseChain
      .then((parsedItems) => {
        parsedItemsCollection.push(parsedItems);
        resolve(parsedItemsCollection);
      });
  });

  return outerPromise;
}

module.exports = parseFiles;
