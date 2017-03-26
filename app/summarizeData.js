'use strict';

function summarizeData(parsedItemsCollection) {
  let summary = null;
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

  return summary;
};

module.exports = summarizeData;