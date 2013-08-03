var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserQGram3Extended = require('./../tokenisers/TokeniserQGram3Extended');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function QGramsDistance(tokeniserToUse) {
	this.tokeniser = tokensizerToUse || (new TokeniserQGram3Extended());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	}
}

inherits(QGramsDistance, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'QGramsDistance';
	},
	getLongDecriptionString: function() {
		return 'Implements the Q Grams Distance algorithm providing a similarity measure between two strings using the qGram approach check matching qGrams/possible matching qGrams';
	}
});

QGramsDistance.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(assertType(str1, 'string'));
	var str2Tokens = this.tokeniser.tokenizeToArray(assertType(str2, 'string'));
	var totalPossible = str1Tokens.length + str2Tokens.length;


	/*
		NOTE!
			This part below made me realize that parts of this library are in serious danger of divide-by-zero errors when zero-length strings are passed to them.
			I guess that slipped the mind of it's original creator.

	*/

	if(totalPossible === 0) {
		return 0;

	} else {
		var totalDistance = this.getUnNormalisedSimilarity.call({str1Tokens: str1Tokens, str2Tokens: str1Tokens}, str1, str2);
		return (totalPossible - totalDistance) / totalPossible;
	}
};

//exact same algorithm from BlockDistance

QGramsDistance.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	assertType(str1, 'string');
	assertType(str2, 'string');
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

module.exports = QGramsDistance;
