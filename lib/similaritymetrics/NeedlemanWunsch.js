var util = require('util');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost01 = require('./costfunctions/SubCost01');

function NeedlemanWunsch(costG, costFunc) {
	if(lodash.isNumber(costG)) {
		this.gapcost = costfG;
		this.dCostFunc = costFunc || new SubCost01();
	} else if(costFunc === null || costFunc === undefined) {
		this.dCostFunc = costG || new SubCost01(); //takes care of empty arguments
		this.gapcost = 2.0;
	} else { //resort to defaults since the input cannot be trusted, yet.
		this.gapcost = 2.0;
		this.dCostFunc = new SubCost01();
	}
}

util.inherits(NeedlemanWunsch, AbstractStringMetric);
NeedlemanWunsch.prototype.getShortDecriptionString= function() {
	return 'NeedlemanWunsch';
}
NeedlemanWunsch.prototype.getLongDecriptionString= function() {
	return 'Implements the Needleman-Wunsch algorithm providing an edit distance based similarity measure between two strings';
}
NeedlemanWunsch.prototype.getdCostFunc= function() {
	return this.dCostFunc;
}
NeedlemanWunsch.prototype.setdCostFunc= function(dCostFunc) {
	this.dCostFunc = dCostFunc;
}
NeedlemanWunsch.prototype.getGapCost= function() {
	return this.gapcost;
}
NeedlemanWunsch.prototype.setGapCost= function(gapcost) {
	this.gapcost = gapcost;
}

NeedlemanWunsch.prototype.getSimilarity = function(str1, str2) {

	var maxV, minV;

	maxV = minV = Math.max(str1.length, str2.length);

	if(maxV !== 0) {

		var maxC = this.dCostFunc.getMaxCost();
		var minC = this.dCostFunc.getMinCost();

		if(maxC > this.gapcost) {
			maxV *= maxC;
		} else {
			maxV *= this.gapcost;
		}

		if(minC < this.gapcost) {
			minV *= minC;
		} else {
			minV *= this.gapcost;
		}

		var needlemanWunsch = this.getUnNormalisedSimilarity(str1, str2, true);

		if(minV < 0) {
			maxV -= minV;
			needlemanWunsch -= minV;
		}

		if(maxV === 0) {
			return 1.0;

		} else {
			return 1.0 - (needlemanWunsch / maxV);
		}

	} else {
		return 1.0;
	}
};

//basically the same of the Levenshtein one, but with an additional gapcost instead of just one
NeedlemanWunsch.prototype.getUnNormalisedSimilarity = function(s, t, typeIgnore) {
	var n = s.length;
	var m = t.length;

	if(n === 0) {
		return m;
	} else if(m === 0) {
		return n;
	} else {
		var _i, _j;

		//by doing the matrix generation in-place I gain about 45% speedup.

		var d = [Array(n)];

		//add dimensions and fill m-axis
		for(_i = 0; _i <= n; _i++) {
			var a = [_i]; //put seed value in first spot
			a.length = n; //preallocate.
			d[_i] = a; //insert row into matrix
		}

		//fill n-axis
		for(_j = 0; _j <= n; _j++) {
			d[0][_j] = _j;
		}


		for(_i = 1; _i <= n; _i++) {
			for(_j = 1; _j <= m; _j++) {

				d[_i][_j] = Math.min(d[_i - 1][_j] + this.gapcost,
									d[_i][_j - 1] + this.gapcost,
									d[_i - 1][_j - 1] +  this.dCostFunc.getCost(s, _i - 1, t, _j - 1));
			}
		}
		return d[n][m];
	}
};

module.exports = NeedlemanWunsch;
