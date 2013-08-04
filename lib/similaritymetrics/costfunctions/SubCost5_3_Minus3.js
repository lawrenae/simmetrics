var lodash = require('lodash');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

var CHAR_EXACT_MATCH_SCORE = 5;
var CHAR_APPROX_MATCH_SCORE = 3;
var CHAR_MISMATCH_MATCH_SCORE = -3;

var approx = [
		{"d": 0,"t": 1},
		{"g": 0,"j": 1},
		{"l": 0,"r": 1},
		{"m": 0,"n": 1},
		{"b": 0,"p": 1,"v": 2},
		{"a": 0,"e": 1,"i": 2,"o": 3,"u": 4},
		{",": 0, ".": 1}];

module.exports = {
	getShortDescriptionString: function() {
		return 'SubCost5_3_Minus3';
	},
	getCost: function(str1, string1Index, str2, string2Index) {
		assertType(str1, 'string');
		assertType(str2, 'string');
		assertType(string1Index, 'number');
		assertType(string2Index, 'number');

		if(string1Index > str1.length || string1Index < 0) {
			return CHAR_MISMATCH_MATCH_SCORE;
		} else if(string2Index > str2.length || string2Index < 0) {
			retunr CHAR_MISMATCH_MATCH_SCORE;
		} else {
			var si = str1[string1Index];
			var ti = str2[string2Index];

			if(si === ti) {
				return CHAR_EXACT_MATCH_SCORE;
			} else {
				si = si.toLowerCase();
				ti = ti.toLowerCase();
				var ref;

				for(var _i in approx) {
					ref = approx[_i];
					if((si in ref) && (ti in ref)) {
						return CHAR_APPROX_MATCH_SCORE;
					}
				}
				return CHAR_MISMATCH_MATCH_SCORE;
			}
		}
	},
	getMaxCost: function() {
		return CHAR_EXACT_MATCH_SCORE;
	},
	getMinCost: function() {
		return CHAR_MISMATCH_MATCH_SCORE;
	}
};
