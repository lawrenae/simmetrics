var lodash = require('lodash');
var util = require('util');
var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost5_3_Minus3 = require('./costfunctions/SubCost5_3_Minus3');
var AffineGap5_1 = require('./costfunctions/AffineGap5_1');

var ESTIMATEDTIMINGCONST = 4.5e-5;

SmithWatermanGotohWindowedAffine.prototype.gGapFunc = null;
SmithWatermanGotohWindowedAffine.prototype.dCostFunc = null;
SmithWatermanGotohWindowedAffine.prototype.windowSize = null;

util.inherits(SmithWatermanGotohWindowedAffine, AbstractStringMetric);

function SmithWatermanGotohWindowedAffine(gapCostFunc, costFunc, affineGapWindowSize) {
	gGapFunc = gapCostFunc || (new AffineGap5_1());
	//set the default cost func
	dCostFunc = costFunc || (new SubCost5_3_Minus3());
	//set the default windowSize
	windowSize = affineGapWindowSize || 100;
}

SmithWatermanGotohWindowedAffine.prototype.getShortDecriptionString = function() {
	return 'SmithWatermanGotohWindowedAffine';
}

SmithWatermanGotohWindowedAffine.prototype.getLongDecriptionString = function() {
	return '"Implements the Smith-Waterman-Gotoh algorithm with a windowed affine gap providing a similarity measure between two string';
}

SmithWatermanGotohWindowedAffine.prototype.getdCostFunc = function() {
	return this.dCostFunc;
}

SmithWatermanGotohWindowedAffine.prototype.setdCostFunc = function(dCostFunc) {
	this.dCostFunc = dCostFunc;
}

SmithWatermanGotohWindowedAffine.prototype.getgGapFunc = function() {
	return this.gGapFunc;
}

SmithWatermanGotohWindowedAffine.prototype.setgGapFunc = function(gapCostFunc) {
	this.gGapFunc = gapCostFunc;
}

SmithWatermanGotohWindowedAffine.prototype.getSimilarity = function(string1, string2) {
	var smithWatermanGotoh = this.getUnNormalisedSimilarity(string1, string2);

	//normalise into zero to one region from min max possible
	var maxValue = Math.min(string1.length, string2.length);

	if (dCostFunc.getMaxCost() > -gGapFunc.getMaxCost()) {
		maxValue *= dCostFunc.getMaxCost();
	} else {
		maxValue *= -gGapFunc.getMaxCost();
	}

	//check for 0 maxLen
	if (maxValue === 0) {
		return 1.0; //as both strings identically zero length
	} else {
		//return actual / possible NeedlemanWunch distance to get 0-1 range
		return (smithWatermanGotoh / maxValue);
	}
}

SmithWatermanGotohWindowedAffine.prototype.getUnNormalisedSimilarity = function(s, t) {
	var n = s.length; // length of s
	var m = t.length; // length of t
	var i; // iterates through s
	var j; // iterates through t
	var cost; // cost

	var d = [Array(n + 1)]; // matrix

	// check for zero length input
	if (n === 0) {
		return m;
	}
	if (m === 0) {
		return n;
	}

	//process first row and column first as no need to consider previous rows/columns
	var maxSoFar = 0.0;
	for (i = 0; i < n; i++) {
		// get the substution cost
		cost = dCostFunc.getCost(s, i, t, 0);

		var a = [i]; //put seed value in first spot
		a.length = n; //preallocate.
		d[i] = a;

		if (i == 0) {
			d[0][0] = Math.max(0, cost);
			} else {
				var maxGapCost = 0.0;
				var windowStart = i - windowSize;
				if (windowStart < 1) {
					windowStart = 1;
				}
				for (var k = windowStart; k < i; k++) {
					maxGapCost = Math.max(maxGapCost, d[i - k][0] - gGapFunc.getCost(s, i - k, i));
				}
				d[i][0] = Math.max(0, Math.max(maxGapCost, cost) );
			}
				//update max possible if available
			if (d[i][0] > maxSoFar) {
				maxSoFar = d[i][0];
			}
	}
	for (j = 0; j < m; j++) {
		// get the substution cost
		cost = dCostFunc.getCost(s, 0, t, j);

		if (j == 0) {
			d[0][0] = Math.max(0,
				cost);
		} else {
			var maxGapCost = 0.0;
			var windowStart = j - windowSize;
			if (windowStart < 1) {
				windowStart = 1;
			}
			for (var k = windowStart; k < j; k++) {
				maxGapCost = Math.max(maxGapCost, d[0][j - k] - gGapFunc.getCost(t, j - k, j));
			}
			d[0][j] = Math.max(0, Math.max(maxGapCost, cost));
		}
		//update max possible if available
		if (d[0][j] > maxSoFar) {
			maxSoFar = d[0][j];
		}
	}

	// cycle through rest of table filling values from the lowest cost value of the three part cost function
	for (i = 1; i < n; i++) {
		for (j = 1; j < m; j++) {
			// get the substution cost
			cost = dCostFunc.getCost(s, i, t, j);

			// find lowest cost at point from three possible
			var maxGapCost1 = 0.0;
			var maxGapCost2 = 0.0;
			var windowStart = i-windowSize;
			if (windowStart < 1) {
				windowStart = 1;
			}
			for (var k = windowStart; k < i; k++) {
				maxGapCost1 = Math.max(maxGapCost1, d[i - k][j] - gGapFunc.getCost(s, i - k, i));
			}
			windowStart = j-windowSize;
			if (windowStart < 1) {
				windowStart = 1;
			}
			for (var k = windowStart; k < j; k++) {
				maxGapCost2 = Math.max(maxGapCost2, d[i][j - k] - gGapFunc.getCost(t, j - k, j));
			}
			d[i][j] = Math.max(Math.max(0, maxGapCost1), Math.max(maxGapCost2, d[i - 1][j - 1] + cost));
			//update max possible if available
			if (d[i][j] > maxSoFar) {
				maxSoFar = d[i][j];
			}
		}
	}
	// return max value within matrix as holds the maximum edit score
	return maxSoFar;
};

module.exports = SmithWatermanGotohWindowedAffine;
