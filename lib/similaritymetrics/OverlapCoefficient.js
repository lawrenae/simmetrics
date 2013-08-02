var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function OverlapCoefficient(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
}

inherits(OverlapCoefficient, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'OverlapCoefficient';
	},
	getLongDecriptionString: function() {
		return 'Implements the Overlap Coefficient algorithm providing a similarity measure between two string where it is determined to what degree a string is a subset of another';
	}
});

OverlapCoefficient.prototype.getUnNormalisedSimilarity =
OverlapCoefficient.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str1, 'string')));
	var str2Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str2, 'string')));

	var terms1 = str1Tokens.length;
	var terms2 = str2Tokens.length;

	var commonTerms = (terms1 + terms2) - lodash.unique(str1Tokens.concat(str2Tokens)).length;

	return (2.0 * commonTerms) / Math.min(terms1, terms2);
};

module.exports = OverlapCoefficient;
