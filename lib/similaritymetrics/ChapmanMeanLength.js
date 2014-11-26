var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');

var CHAPMANMEANLENGTHMAXSTRING = 500;

function ChapmanMeanLength() {}

util.inherits(ChapmanMeanLength, AbstractStringMetric);
ChapmanMeanLength.prototype.getShortDecriptionString= function() {
	return 'ChapmanMeanLength';
};
ChapmanMeanLength.prototype.getLongDecriptionString= function() {
	return 'Implements the Chapman Mean Length algorithm provides a similarity measure between two strings from size of the mean length of the vectors - this approach is suppossed to be used to determine which metrics may be best to apply rather than giveing a valid responce itself';
};

ChapmanMeanLength.prototype.getUnNormalisedSimilarity =
ChapmanMeanLength.prototype.getSimilarity = function(str1, str2) {
	var tlen = str1.length + str2.length;

	if(tlen > CHAPMANMEANLENGTHMAXSTRING) {
		return 1.0;
	} else {
		return 1.0 - Math.pow((CHAPMANMEANLENGTHMAXSTRING - tlen) / CHAPMANMEANLENGTHMAXSTRING, 4)
	}
};

module.exports = ChapmanMeanLength;
