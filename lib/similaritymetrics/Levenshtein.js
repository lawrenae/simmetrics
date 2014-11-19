var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost01 = require('./costfunctions/SubCost01');

function Levenshtein() {}
util.inherits(Levenshtein, AbstractStringMetric);

Levenshtein.prototype.getShortDecriptionString = function() {
	return 'Levenshtein';
}
Levenshtein.prototype.getLongDecriptionString = function() {
	return 'Implements the basic Levenshtein algorithm providing a similarity measure between two strings';
}

Levenshtein.prototype.getSimilarity = function(str1, str2) {
	var levensteinDistance = this.getUnNormalisedSimilarity(str1, str2);

	var maxLen = Math.max(str1.length, str2.length);

	if(maxLen === 0) {
		return 1;
	} else {
		return 1.0 - (levensteinDistance / maxLen);
	}
};

Levenshtein.prototype.getUnNormalisedSimilarity= function(s, t, typeIgnore) {
	var n = s.length;
	var m = t.length;

	if(n === 0) {
		return m;
	}

	if(m === 0) {
		return n;
	}

	var _i, _j;

	var d = [Array(n + 1)];

	//step 2
	for(_i = 0; _i <= n; _i++) {
		var a = [_i]; //put seed value in first spot
		a.length = n; //preallocate.
		d[_i] = a; //insert row into matrix
	}

	//fill n-axis
	for(_j = 0; _j <= n; _j++) {
		d[0][_j] = _j;
	}

	//step 3
	for(_i = 1; _i <= n; _i++) {
		//step 4
		for(_j = 1; _j <= m; _j++) {
			//step 5
			var cost = new SubCost01().getCost(s, _i - 1, t, _j - 1);
			d[_i][_j] = Math.min(d[_i - 1][_j] + 1,
								d[_i][_j - 1] + 1,
								d[_i - 1][_j - 1] + cost);
		}
	}
	return d[n][m];
};

module.exports = Levenshtein;
