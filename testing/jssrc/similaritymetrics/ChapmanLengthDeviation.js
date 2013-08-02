var inherits = require('./../inherits');

var AbstractStringMetric = require('./AbstractStringMetric');

function assertType(x, t) {
	if (typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function ChapmanLengthDeviation() {}

inherits(ChapmanLengthDeviation, AbstractStringMetric, {
	getShortDescriptionString: function() {
		return 'ChapmanLengthDeviation';
	},
	getLongDescriptionString: function() {
		return 'Implements the Chapman Length Deviation algorithm whereby the length deviation of the input strings is used to determine if the strings are similar in size - This apporach is not intended to be used single handedly but rather alongside other approaches';
	}
});

ChapmanLengthDeviation.prototype.getUnNormalisedSimilarity =
ChapmanLengthDeviation.prototype.getSimilarity = function(str1, str2) {

	if (assertType(str1, 'string').length >= assertType(str2, 'string').length) {
		return str2.length / str1.length;
	} else {
		return str1.length / str2.length;
	}
};

module.exports = ChapmanLengthDeviation;
