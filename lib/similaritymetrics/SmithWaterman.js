var util = require('util');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost1_Minus2 = require('./costfunctions/SubCost1_Minus2');

function SmithWaterman(costG, costFunc) {
	if(lodash.isNumber(costG)) {
		this.gapcost = costfG;
		this.dCostFunc = costFunc || new SubCost1_Minus2();
	} else if(costFunc === null || costFunc === undefined) {
		this.dCostFunc = costG || new SubCost1_Minus2(); //takes care of empty arguments
		this.gapcost = 0.5;
	} else { //resort to defaults since the input cannot be trusted, yet.
		this.gapcost = 0.5;
		this.dCostFunc = new SubCost1_Minus2();
	}
}

util.inherits(SmithWaterman, AbstractStringMetric);
SmithWaterman.prototype.getShortDecriptionString= function() {
	return 'SmithWaterman';
}
SmithWaterman.prototype.getLongDecriptionString= function() {
	return 'Implements the Smith-Waterman algorithm providing a similarity measure between two strings';
}
SmithWaterman.prototype.getdCostFunc= function() {
	return this.dCostFunc;
}
SmithWaterman.prototype.setdCostFunc= function(dCostFunc) {
	this.dCostFunc = dCostFunc;
}
SmithWaterman.prototype.getGapCost= function() {
	return this.gapcost;
}
SmithWaterman.prototype.setGapCost= function(gapcost) {
	this.gapcost = gapcost;
}

SmithWaterman.prototype.getSimilarity = function(str1, str2) {
	var maxValue = Math.min(str1.length, str2.length);
	var maxCost = this.dCostFunc.getMaxCost();

	if (maxCost > - this.gapcost) {
		maxValue *= maxCost
	} else {
		maxValue *= -this.gapcost;
	}

	if(maxValue === 0) {
		return 1.0;
	} else {
		return (this.getUnNormalisedSimilarity(str1, str2) / maxValue);
	}
};

SmithWaterman.prototype.getUnNormalisedSimilarity = function(s, t) {
	var n = s.length;
	var m = t.length;

	if(n === 0) {
		return m;
	}
	if(m === 0) {
		return n;
	}

	var i, j, cost, maxSoFar = 0.0;

	//by doing the matrix generation in-place I gain about 45% speedup.

	var d = [Array(n)];

	//add dimensions and fill m-axis
	for(i = 0; i < n; i++) {
		cost = this.dCostFunc.getCost(s, i, t, 0);

		if (i === 0) {
			d[0][0] = Math.max(0, -this.gapcost, cost);
		} else {
			var a = [Math.max(0, d[i - 1][0] - this.gapcost, cost)];
			a.length = n;
			d[i] = a;
		}

		if(d[i][0] > maxSoFar) {
			maxSoFar = d[i][0];
		}
	}

	//fill n-axis
	for(j = 0; j < m; j++) {
		var cost = this.dCostFunc.getCost(s, 0, t, j);

		if (j === 0) {
			d[0][0] = Math.max(0, -this.gapcost, cost);
		} else {
			d[0][j] = Math.max(0, d[0][j - 1] - this.gapcost, cost);
		}


		if(d[0][j] > maxSoFar) {
			maxSoFar = d[0][j];
		}
	}

	for(i = 1; i < n; i++) {
		for(j = 1; j < m; j++) {
			//get the substution cost
			var cost = this.dCostFunc.getCost(s, i, t, j);

			// find lowest cost at point from three possible
			d[i][j] = _c = Math.max(0,
								d[i - 1][j] - this.gapcost,
								d[i][j - 1] - this.gapcost,
								d[i - 1][j - 1] +  cost);

			if(d[i][j] > maxSoFar) {
				maxSoFar = d[i][j];
			}
		}
	}

	return maxSoFar;
};

module.exports = SmithWaterman;
