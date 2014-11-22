var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');
var SmithWaterman = require('./SmithWaterman');

var ESTIMATEDTIMINGCOST = 0.0344;

util.inherits(MongeElkan, AbstractStringMetric);

function MongeElkan(tokeniserToUse, metricToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	if(!this.tokeniser._isTokeniser) {
		throw new TypeError('Error: Invalid tokeniser');
	} else {
		this.iSM = metricToUse || (new SmithWaterman());
	}
}

MongeElkan.prototype.getShortDecriptionString = function() {
	return 'MongeElkan';
}

MongeElkan.prototype.getLongDecriptionString = function() {
	return 'Implements the Monge Elkan algorithm providing an matching style similarity measure between two strings';
}

MongeElkan.prototype.getUnNormalisedSimilarity =
MongeElkan.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = this.tokeniser.tokenizeToArray(str1, 'string');
	var str2Tokens = this.tokeniser.tokenizeToArray(str2, 'string');

	var maxFound, sumMatches = 0.0;
	var instance = this;

	str1Tokens.forEach(function(str1Token) {
		maxFound = 0.0;

		str2Tokens.forEach(function(str2Token) {
			var found = instance.iSM.getSimilarity(str1Token, str2Token);
			if(found > maxFound) {
				maxFound = found;
			}
		});

		sumMatches += maxFound
	});

	return sumMatches / str1Tokens.length;
};

module.exports = MongeElkan;
