var lodash = require('lodash');
var util = require('util');
var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost5_3_Minus3 = require('./costfunctions/SubCost5_3_Minus3');
var AffineGap5_1 = require('./costfunctions/AffineGap5_1');
var SmithWatermanGotohWindowedAffine = require('./SmithWatermanGotohWindowedAffine');

util.inherits(SmithWatermanGotoh, SmithWatermanGotohWindowedAffine);

function SmithWatermanGotoh() {
	SmithWatermanGotohWindowedAffine.call(this, new AffineGap5_1(), new SubCost5_3_Minus3(), Number.MAX_VALUE);
}

SmithWatermanGotoh.prototype.getShortDecriptionString = function() {
	return 'SmithWatermanGotoh';
}
SmithWatermanGotoh.prototype.getLongDecriptionString = function() {
	return 'Implements the Smith-Waterman algorithm providing a similarity measure between two strings';
}
SmithWatermanGotoh.prototype.getdCostFunc = function() {
	return dCostFunc;
}
SmithWatermanGotoh.prototype.setdCostFunc = function(dCostFunc) {
	dCostFunc = dCostFunc;
}
SmithWatermanGotoh.prototype.getGapCost = function() {
	return gapcost;
}
SmithWatermanGotoh.prototype.setGapCost = function(gapcost) {
	gapcost = gapcost;
}

module.exports = SmithWatermanGotoh;
