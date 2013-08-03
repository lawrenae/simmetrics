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

function DiceSimilarity(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	}
}

inherits(DiceSimilarity, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'DiceSimilarity';
	},
	getLongDecriptionString: function() {
		return 'Implements the DiceSimilarity algorithm providing a similarity measure between two strings using the vector space of present terms';
	}
});

DiceSimilarity.prototype.getUnNormalisedSimilarity =
DiceSimilarity.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str1, 'string')));
	var str2Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str2, 'string')));

	var terms1 = str1Tokens.length;
	var terms2 = str2Tokens.length;

	var commonTerms = (terms1 + terms2) - lodash.unique(str1Tokens.concat(str2Tokens)).length;

	return (2.0 * commonTerms) / (terms1 + terms2);
};

module.exports = DiceSimilarity;
