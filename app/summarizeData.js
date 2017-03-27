'use strict';

function summarizeData(parsedItemsCollection) {
  const sampleSize = parsedItemsCollection.length;
  let summarizedItems = [];
  parsedItemsCollection.forEach((parsedItems, index) => {
    if (index === 0) {
      summarizedItems = parsedItems;
    } else {
      parsedItems.forEach((item, itemIndex) => {
        if (item.itemValue !== null) {
          summarizedItems[itemIndex].itemValue += item.itemValue;
        }
      });
    }
  });

  summarizedItems.forEach((item, index, array) => {
    array[index].itemValue =
      item.itemValue === null ? null : Math.floor(item.itemValue / sampleSize);
  });

  return summarizedItems;
}

module.exports = summarizeData;
