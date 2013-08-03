var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');

function assertType(x, t, ignore) {
	if(!ignore && typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function Levenshtein() {}
inherits(Levenshtein, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'Levenshtein';
	},
	getLongDecriptionString: function() {
		return 'Implements the basic Levenshtein algorithm providing a similarity measure between two strings';
	}
});

Levenshtein.prototype.getSimilarity = function(str1, str2) {
	var levenshteinDistance = this.getUnNormalisedSimilarity(assertType(str1, 'string'), assertType(str2, 'string'), true);

	var maxLen = Math.max(str1.length, str2.length);

	if(maxLen === 0) {
		return 1;
	} else {
		return 1.0 - (levenshteinDistance / maxLen);
	}
};

Levenshtein.prototype.getUnNormalisedSimilarity= function(s, t, typeIgnore) {
	var n = assertType(s, 'string', typeIgnore).length;
	var m = assertType(t, 'string', typeIgnore).length;

	if(n === 0) {
		return m;
	} else if(m === 0) {
		return n;
	} else {
		var _i, _j;

		//by doing the matrix generation in-place I gain about 45% speedup.

		var d = [Array(n)];

		//add dimensions and fill m-axis
		for(_i = 0; _i <= n; _i++) {
			var a = [_i]; //put seed value in first spot
			a.length = n; //preallocate.
			d[_i] = a; //insert row into matrix
		}

		//fill n-axis
		for(_j = 0; _j <= n; _j++) {
			d[0][_j] = _j;
		}

		for(_i = 1; _i <= n; _i++) {
			for(_j = 1; _j <= m; _j++) {

				d[_i][_j] = Math.min(d[_i - 1][_j] + 1,
									d[_i][_j - 1] + 1,
									d[_i - 1][_j - 1] + ((s[_i - 1] === s[_j - 1]) ? 0.0 : 1.0));
			}
		}
		return d[n][m];
	}
};

module.exports = Levenshtein;
