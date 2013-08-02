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

function JaccardSimilarity(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
}

inherits(JaccardSimilarity, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'JaccardSimilarity';
	},
	getLongDecriptionString: function() {
		return 'Implements the Jaccard Similarity algorithm providing a similarity measure between two strings';
	}
});

JaccardSimilarity.prototype.getUnNormalisedSimilarity =
JaccardSimilarity.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str1, 'string')));
	var str2Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str2, 'string')));

	var all = lodash.unique(str1Tokens.concat(str2Tokens)).length;

	return ((str1Tokens.length + str2Tokens.length) - all) / all;
};

module.exports = JaccardSimilarity;
