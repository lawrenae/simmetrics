var inherits = require('./../inherits');

var AbstractStringMetric = require('./AbstractStringMetric');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

var CHAPMANMEANLENGTHMAXSTRING = 500;

function ChapmanMeanLength() {}
inherits(ChapmanMeanLength, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'ChapmanMeanLength';
	},
	getLongDecriptionString: function() {
		return 'Implements the Chapman Mean Length algorithm provides a similarity measure between two strings from size of the mean length of the vectors - this approach is suppossed to be used to determine which metrics may be best to apply rather than giveing a valid responce itself';
	}
});

ChapmanMeanLength.prototype.getUnNormalisedSimilarity =
ChapmanMeanLength.prototype.getSimilarity = function(str1, str2) {
	var tlen = assertType(str1, 'string').length + assertType(str2, 'string').length;

	if(tlen > CHAPMANMEANLENGTHMAXSTRING) {
		return 1.0;
	} else {
		return 1.0 - Math.pow((CHAPMANMEANLENGTHMAXSTRING - tlen) / CHAPMANMEANLENGTHMAXSTRING, 4)
	}
};

module.exports = ChapmanMeanLength;
