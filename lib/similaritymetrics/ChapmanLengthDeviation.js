var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');

function ChapmanLengthDeviation() {}

util.inherits(ChapmanLengthDeviation, AbstractStringMetric);
ChapmanLengthDeviation.prototype.getShortDescriptionString= function() {
	return 'ChapmanLengthDeviation';
};
ChapmanLengthDeviation.prototype.getLongDescriptionString= function() {
	return 'Implements the Chapman Length Deviation algorithm whereby the length deviation of the input strings is used to determine if the strings are similar in size - This apporach is not intended to be used single handedly but rather alongside other approaches';
};

ChapmanLengthDeviation.prototype.getUnNormalisedSimilarity =
ChapmanLengthDeviation.prototype.getSimilarity = function(str1, str2) {

	if (str1.length >= str2.length) {
		return str2.length / str1.length;
	} else {
		return str1.length / str2.length;
	}
};

module.exports = ChapmanLengthDeviation;
