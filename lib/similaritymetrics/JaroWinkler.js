var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');

var Jaro = require('./Jaro');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

//constants
var MINPREFIXTESTLENGTH = 6;
var PREFIXADUSTMENTSCALE = 0.1;

function JaroWinkler() {
	this.iSM = new Jaro();
}

inherits(JaroWinkler, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'JaroWinkler';
	},
	getLongDecriptionString: function() {
		return 'Implements the Jaro-Winkler algorithm providing a similarity measure between two strings allowing character transpositions to a degree adjusting the weighting for common prefixes';
	}
});

JaroWinkler.prototype.getUnNormalisedSimilarity =
JaroWinkler.prototype.getSimilarity = function(str1, str2) {
	var dist = this.iSM.getSimilarity(str1, str2); //does type checking in this

	var prefixLength = this.getPrefixLength(str1, str2);

	return dist + (prefixLength * PREFIXADUSTMENTSCALE) * (1.0 - dist));
};

JaroWinkler.prototype.getPrefixLength = function(str1, str2) {
	//luckily, JS's Math.min can handle many arguments
	var n = Math.min(MINPREFIXTESTLENGTH, assertType(str1, 'string').length, assertType(str2, 'string').length);

	for(var _i = 0; _i < n; _i++) {
		if(str1[_i] === str2[_i]) {
			return i;
		}
	}

	return n;
};

module.exports = JaroWinkler;
