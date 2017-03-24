'use strict';

function summarizeData(parsedItemsCollection) {
  let summary = null;
  let sampleCount = parsedItemsCollection.length;
  parsedItemsCollection.forEach((parsedItems) => {
    if (!summary) {
      summary = parsedItems;
    }
    else {
      parsedItems.forEach((item, itemIndex) => {
        summary[itemIndex].itemValue += item.itemValue;
      });
    };
  });

  console.log('sample count = ' + sampleCount);
  console.log(JSON.stringify(summary));
};

module.exports = summarizeData;