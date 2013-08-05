var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');

function assertType(x, t, ignore) {
	if (!ignore && typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function LevenshteinLite() {}
inherits(LevenshteinLite, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'LevenshteinLite';
	},
	getLongDecriptionString: function() {
		return 'Implements the basic Levenshtein algorithm providing a similarity measure between two strings, but without using a full matrix';
	}
});

LevenshteinLite.prototype.getSimilarity = function(str1, str2) {

	var maxLen = Math.max(assertType(str1, 'string').length, assertType(str2, 'string').length);

	if (maxLen === 0) {
		return 1;

	} else {
		return 1.0 - (this.getUnNormalisedSimilarity(str1, str2, true) / maxLen);
	}
};

LevenshteinLite.prototype.getUnNormalisedSimilarity = function(s, t, typeIgnore) {
	var n = assertType(s, 'string', typeIgnore).length;
	var m = assertType(t, 'string', typeIgnore).length;

	if (n === 0) {
		return m;

	} else if (m === 0) {
		return n;

	} else {

		var _i, _j;

		var v0 = new Array(m + 1)
		var v1 = new Array(m + 1)

		for (_i = 0; _i < v0.length; _i++) {
			v0[_i] = _i;
		}

		for (_i = 0; _i < n; _i++) {

			v1[0] = _i + 1;

			for (_j = 0; _j < m; _j++) {
				v1[_j + 1] = Math.min(v1[_j] + 1,
							v0[_j + 1] + 1,
							v0[_j] + ((s[_i] === t[_j]) ? 0 : 1));
			}

			v0 = v1.slice(0);
		}

		return v1[m];
	}
};

module.exports = LevenshteinLite;
