const test = require('./Yourname_ModuleName');

console.log(test.getTripById(1));
console.log(test.userBooking);
console.log(test.bookTrip('Yujie', 11, 1));
console.log(test.userBooking);
console.log(test.cancelBooking(11, 1));
console.log(test.getTripById(1));
console.log(test.searchBooking("to"));