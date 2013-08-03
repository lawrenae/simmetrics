var Soundex = require('./../lib/similaritymetrics/Soundex');

var res, test = new Soundex();

//give it enough time for V8 to do it's thing.
for(var i = 0; i < 1000; i++) {
	test.soundex('Hello, World!', 4);
}

time = process.hrtime();
res = test.soundex('Hello, World!', 4);
diff = process.hrtime(time);

console.log(res);
console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
