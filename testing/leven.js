var Levenshtein = require('./../jssrc/similaritymetrics/NeedlemanWunch');

var res, test = new Levenshtein();

//give it enough time for V8 to do it's thing.
for(var i = 0; i < 1000; i++) {
	test.getUnNormalisedSimilarity('Supercalifragilisticexpialidocious', 'Supercalifrajilisticexpialidotious');
}

time = process.hrtime();
res = test.getUnNormalisedSimilarity('Supercalifragilisticexpialidocious', 'Supercalifrajilisticexpialidotious');
diff = process.hrtime(time);

console.log(res);
console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
