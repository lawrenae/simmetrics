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

function EuclideanDistance(tokeniserToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	}
}

inherits(EuclideanDistance, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'EuclideanDistance';
	},
	getLongDecriptionString: function() {
		return 'Implements the Euclidean Distancey algorithm providing a similarity measure between two stringsusing the vector space of combined terms as the dimensions';
	}
});

EuclideanDistance.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(assertType(str1, 'string'));
	var str2Tokens = this.tokeniser.tokenizeToArray(assertType(str2, 'string'));

	var totalPossible = Math.sqrt((str1Tokens.length * str1Tokens.length) + (str2Tokens.length * str2Tokens.length));
	var totalDistance = this.getUnNormalisedSimilarity.call({str1Tokens: str1Tokens, str2Tokens: str1Tokens}, str1, str2);

	return (totalPossible - totalDistance) / totalPossible;

};

EuclideanDistance.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	assertType(str1, 'string');
	assertType(str2, 'string');
	//this has two different contexts here
	var str1Tokens = this.str1Tokens || this.tokeniser.tokenizeToArray(str1);
	var str2Tokens = this.str2Tokens || this.tokeniser.tokenizeToArray(str2);

	var allTokens = lodash.unique(str1Tokens.concat(str2Tokens));

	var token, stoken, , totalDistance = 0;
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
		totalDistance += Math.pow(countInString1 - countInString2, 2);
	}

	return totalDistance;
};

module.exports = EuclideanDistance;
