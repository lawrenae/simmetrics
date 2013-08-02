var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');
var SmithWatermanGotoh = require('./SmithWatermanGotoh');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}


//not sure about this part... Since, well, the Java version had typed overloads. since JS doesn't have types, this is the best I can do.
function MongeElkan(tokeniserToUse, metricToUse) {
	this.tokeniser = tokeniserToUse || (new TokeniserWhitespace());
	this.iSM = metricToUse || (new SmithWatermanGotoh());
}

inherits(MongeElkan, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'MongeElkan';
	},
	getLongDecriptionString: function() {
		return 'Implements the Monge Elkan algorithm providing an matching style similarity measure between two strings';
	}
});

MongeElkan.prototype.getUnNormalisedSimilarity =
MongeElkan.prototype.getSimilarity = function(str1, str2) {
	var str1Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str1, 'string')));
	var str2Tokens = lodash.unique(this.tokeniser.tokenizeToArray(assertType(str2, 'string')));

	var found, maxFound, sumMatches = 0;

	for(var _i in str1Tokens) {
		maxFound = 0;

		for(var _j in str2Tokens) {
			found = this.iSM.getSimilarity(str1Tokens[_i], str2Tokens[_j]);
			if(found > maxFound) {
				maxFound = found;
			}
		}

		sumMatches += maxFound
	}

	return sumMatches / str1Tokens.length;
};

module.exports = MongeElkan;
