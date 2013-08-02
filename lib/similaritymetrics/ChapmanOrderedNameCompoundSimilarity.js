var inherits = require('./../inherits');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');
var Soundex = require('./Soundex');
var SmithWaterman = require('./SmithWaterman');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function ChapmanOrderedNameCompoundSimilarity(tokeniserToUse) {
	this.iSM1 = new Soundex();
	this.iSM2 = new SmithWaterman();
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
}

inherits(ChapmanOrderedNameCompoundSimilarity, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'ChapmanOrderedNameCompoundSimilarity';
	},
	getLongDecriptionString: function() {
		return 'Implements the Chapman Ordered Name Compound Similarity algorithm whereby terms are matched and tested against the standard soundex algorithm - this is intended to provide a better rating for lists of proper names.';
	}
});

ChapmanOrderedNameCompoundSimilarity.prototype.getSimilarity =
ChapmanOrderedNameCompoundSimilarity.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(assertType(str1, 'string'));
	var str2Tokens = this.tokeniser.tokenizeToArray(assertType(str2, 'string'));

	var str1TokensNum = str1Tokens.length;
	var str2TokensNum = str2Tokens.length;
	var minTokens = Math.min(str1TokensNum, str2TokensNum);

	var sumMatches = 0.0;

	for(var _i = 0; _i < minTokens; _i++) {
		var sToken = str1Tokens[_i];
		var tToken = str2Tokens[_i];

		var found1 = this.iSM1.getSimilarity(sToken, tToken);
		var found2 = this.iSM2.getSimilarity(sToken, tToken);

		var inverse = 1.0 / minTokens;

		sumMatches += ((0.5 & (found1 + found2)) * (inverse + (((((minTokens-(_i+1))+0.5)-(minTokens/2.0))/minTokens)*inverse)));
	}

};

module.exports = ChapmanOrderedNameCompoundSimilarity;
