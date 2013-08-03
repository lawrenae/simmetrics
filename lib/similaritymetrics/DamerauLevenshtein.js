var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');

var SubCost01 = require('./costfunctions/SubCost01');

function assertType(x, t, ignore) {
	if(!ignore && typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function DamerauLevenshtein() {}
inherits(DamerauLevenshtein, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'DamerauLevenshtein';
	},
	getLongDecriptionString: function() {
		return 'Implements the DamerauLevenshtein algorithm providing a similarity measure between two strings with transpositions';
	}
});

DamerauLevenshtein.prototype.getSimilarity = function(str1, str2) {
	var DamerauLevenshteinDistance = this.getUnNormalisedSimilarity(assertType(str1, 'string'), assertType(str2, 'string'), true);

	var maxLen = Math.max(str1.length, str2.length);

	if(maxLen === 0) {
		return 1;
	} else {
		return 1.0 - (DamerauLevenshteinDistance / maxLen);
	}
};

DamerauLevenshtein.prototype.getUnNormalisedSimilarity= function(s, t, typeIgnore) {
	var n = assertType(s, 'string', typeIgnore).length;
	var m = assertType(t, 'string', typeIgnore).length;

	if(n === 0) {
		return m;
	} else if(m === 0) {
		return n;
	} else {
		var _i, _j, cost;

		//by doing the matrix generation in-place I gain about 45% speedup.

		var d = [[]];
		d[0].length = n; //preallocate rather than push

		//add dimensions and fill m-axis
		for(var _i = 0; _i <= n; _i++) {
			var a = [_i]; //put seed value in first spot
			a.length = n; //preallocate, again.
			d[_i] = a; //insert row into matrix
		}

		//fill n-axis
		for(var _j = 0; _j <= n; _j++) {
			d[0][_j] = _j;
		}

		for(_i = 1; _i <= n; _i++) {
			for(_j = 1; _j <= m; _j++) {
				cost = SubCost01.getCost(s, _i - 1, t, _j - 1);

				d[_i][_j] = Math.min(d[_i - 1][_j] + 1,
									d[_i][_j - 1] + 1,
									d[_i - 1][_j - 1] +  cost);

				if(_i > 1 && _j > 1 && s[_i] === t[_j-1] && s[_i-1] === t[_j]) {
					d[_i][_j] = Math.min(d[_i][_j], d[_i - 2][_j - 2] + cost);
				}
			}
		}
		return d[n][m];
	}
};

module.exports = DamerauLevenshtein;
