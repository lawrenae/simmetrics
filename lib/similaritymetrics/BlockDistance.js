var util = require('util');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');

function BlockDistance(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	}
}

util.inherits(BlockDistance, AbstractStringMetric);

BlockDistance.prototype.getShortDecriptionString = function() {
	return 'BlockDistance';
}
BlockDistance.prototype.getLongDecriptionString = function() {
	return 'Implements the Needleman-Wunch algorithm providing an edit distance based similarity measure between two strings';
}

BlockDistance.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(str1);
	var str2Tokens = this.tokeniser.tokenizeToArray(str2);
	var totalPossible = str1Tokens.length + str2Tokens.length;

	if(totalPossible === 0) {
		return 0;
	} else {
		var totalDistance = this.getUnNormalisedSimilarity.call({str1Tokens: str1Tokens, str2Tokens: str1Tokens}, str1, str2);
		return (totalPossible - totalDistance) / totalPossible;
	}
};

BlockDistance.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	//this has two different contexts here
	var str1Tokens = this.str1Tokens || this.tokeniser.tokenizeToArray(str1);
	var str2Tokens = this.str2Tokens || this.tokeniser.tokenizeToArray(str2);

	var allTokens = lodash.unique(str1Tokens.concat(str2Tokens));

	var token, stoken, totalDistance = 0;
	for(var _i in allTokens) {
		token = allTokens[_i];

		var countInString1 = 0;
		var countInString2 = 0;
		for(var _j in str1Tokens) {
			if(str1Tokens[_j] === token) {
				countInString1++;
			}
		}
		for(var _j in str2Tokens) {
			if(str2Tokens[_j] === token) {
				countInString2++;
			}
		}

		totalDistance += Math.abs(countInString1 - countInString2);
	}

	return totalDistance;
};

module.exports = BlockDistance;
