var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');
var Soundex = require('./Soundex');
var SmithWaterman = require('./SmithWaterman');

function ChapmanOrderedNameCompoundSimilarity(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	} else {
		this.iSM1 = new Soundex();
		this.iSM2 = new SmithWaterman();
	}
};

util.inherits(ChapmanOrderedNameCompoundSimilarity, AbstractStringMetric);
ChapmanOrderedNameCompoundSimilarity.prototype.getShortDecriptionString= function() {
	return 'ChapmanOrderedNameCompoundSimilarity';
};
ChapmanOrderedNameCompoundSimilarity.prototype.getLongDecriptionString= function() {
	return 'Implements the Chapman Ordered Name Compound Similarity algorithm whereby terms are matched and tested against the standard soundex algorithm - this is intended to provide a better rating for lists of proper names.';
};

ChapmanOrderedNameCompoundSimilarity.prototype.getSimilarity =
ChapmanOrderedNameCompoundSimilarity.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(str1);
	var str2Tokens = this.tokeniser.tokenizeToArray(str2);

	var str1TokensNum = str1Tokens.length;
	var str2TokensNum = str2Tokens.length;
	var minTokens = Math.min(str1TokensNum, str2TokensNum);

	var SKEW_AMMOUNT = 1.0;

	var sumMatches = 0.0;

	for(var i = 1; i <= minTokens; i++) {
		var strWeightingAdjustment = ((1.0/minTokens)+(((((minTokens-i)+0.5)- (minTokens/2.0))/minTokens)*SKEW_AMMOUNT*(1.0/minTokens)));

		var sToken = str1Tokens[str1TokensNum - i];
		var tToken = str2Tokens[str2TokensNum - i];

		var found1 = this.iSM1.getSimilarity(sToken, tToken);
		var found2 = this.iSM2.getSimilarity(sToken, tToken);

		var inverse = 1.0 / minTokens;

		sumMatches += (0.5 * (found1 + found2)) * strWeightingAdjustment;
	}

	return sumMatches;
};

module.exports = ChapmanOrderedNameCompoundSimilarity;
