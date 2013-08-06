/*

	Example taken from:
		http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Dynamic/Hirsch/

*/


var Hirschberg = require('./../lib/similaritymetrics/Hirschberg');

var res, test = new Hirschberg();

time = process.hrtime();
res = test.getUnNormalisedSimilarity('ACGTACGTACGT', 'AGTACCTACCGT');
diff = process.hrtime(time);

console.log(res);
console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
