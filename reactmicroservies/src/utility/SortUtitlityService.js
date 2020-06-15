// Function for sorting table items
import React from 'react';
class SortUtitlityService {

    compareBy(key, ascDesFlag) {
        return function (a, b) {
            if (ascDesFlag === true) {
                if (a[key] > b[key]) {
                    return -1;
                }
            } else {
                if (a[key] < b[key]) {
                      return -1;
                  }
                };
            }
      }

    sortBy(pageOfItems, key, ascDesFlag) {
        let arrayCopy = [...pageOfItems];
        arrayCopy.sort(this.compareBy(key, ascDesFlag));
        return arrayCopy;
    }
}

export default new SortUtitlityService;