var util = require('util');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');

function JaccardSimilarity(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	}
}

util.inherits(JaccardSimilarity, AbstractStringMetric);
JaccardSimilarity.prototype.getShortDecriptionString = function() {
	return 'JaccardSimilarity';
};
JaccardSimilarity.prototype.getLongDecriptionString= function() {
	return 'Implements the Jaccard Similarity algorithm providing a similarity measure between two strings';
};

JaccardSimilarity.prototype.getUnNormalisedSimilarity =
JaccardSimilarity.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = lodash.unique(this.tokeniser.tokenizeToArray(str1));
	var str2Tokens = lodash.unique(this.tokeniser.tokenizeToArray(str2));

	var all = lodash.unique(str1Tokens.concat(str2Tokens)).length;

	return ((str1Tokens.length + str2Tokens.length) - all) / all;
};

module.exports = JaccardSimilarity;
