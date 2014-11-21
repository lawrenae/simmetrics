var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function MatchingCoefficient(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	}
}

util.inherits(MatchingCoefficient, AbstractStringMetric);
MatchingCoefficient.prototype.getShortDecriptionString = function() {
	return 'MatchingCoefficient';
}
MatchingCoefficient.prototype.getLongDecriptionString = function() {
	return 'Implements the Matching Coefficient algorithm providing a similarity measure between two strings';
}

MatchingCoefficient.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(assertType(str1, 'string'));
	var str2Tokens = this.tokeniser.tokenizeToArray(assertType(str2, 'string'));
	var totalPossible = Math.max(str1Tokens.length, str2Tokens.length);

	return this.getUnNormalisedSimilarity.call({str1Tokens: str1Tokens, str2Tokens: str1Tokens}, str1, str2) / totalPossible;
};

MatchingCoefficient.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	assertType(str1, 'string');
	assertType(str2, 'string');
	//this has two different contexts here
	var str1Tokens = this.str1Tokens || this.tokeniser.tokenizeToArray(str1);
	var str2Tokens = this.str2Tokens || this.tokeniser.tokenizeToArray(str2);

	var totalFound = 0;

	for(var _i in str1Tokens) {
		for(var _j in str2Tokens) {
			if(str1Tokens[_i] === str2Tokens[_j]) {
				totalFound++;
				break;
			}
		}
	}

	return totalFound;
};

module.exports = MatchingCoefficient;
