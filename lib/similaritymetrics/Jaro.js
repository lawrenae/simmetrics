var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function Jaro() {}
inherits(Jaro, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'Jaro';
	},
	getLongDecriptionString: function() {
		return 'Implements the Jaro algorithm providing a similarity measure between two strings allowing character transpositions to a degree';
	}
});

Jaro.prototype.getUnNormalisedSimilarity =
Jaro.prototype.getSimilarity = function(str1, str2) {
	var halfLen = Math.ceil(Math.min(assertType(str1, 'string').length, assertType(str2, 'string').length) / 2.0);

	var common1 = this.getCommonCharacters(str1, str2, halfLen);
	var common2 = this.getCommonCharacters(str2, str1, halfLen);

	if(common1.length === 0 || common2.length === 0 || (common1.length !== common2.length)) {
		return 0;

	} else {
		var transpositions = 0;
		for(var _i in common1) {
			if(common1[_i] !== common2[_i]) {
				transpositions++;
			}
		}

		transpositions /= 2.0;

		return ((common1.length / str1.length) +
				(common2.length / str2.length) +
				((common1.length - transpositions) / common1.length / 3.0));
	}
};

Jaro.prototype.getCommonCharacters = function(str1, str2, distSep) {
	assertType(str1, 'string');
	assertType(str2, 'string');

	var ch, found, common = []; //I also think an array works better for this.

	//Javascript strings are immutable via the subscript operator, so an array is used
	var copy = str2.split('');

	for(var _i in str1) {
		ch = str1[_i];

		found = false;

		for(var _j = Math.max(0, _i - distSep); !found && (_j < Math.min(_i + distSep, str2.length - 1)); _j++) {
			if(copy[_j] === ch) {
				found = true;
				common.push(ch);
				copy[_j] = 0;
			}
		}
	}

	return common;
}

module.exports = Jaro;
