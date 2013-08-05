var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost01 = require('./costfunctions/SubCost01');

function assertType(x, t, ignore) {
	if(!ignore && typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function NeedlemanWunsch(costG, costFunc) {
	if(lodash.isNumber(costG)) {
		this.gapcost = costfG;
		this.dCostFunc = costFunc || SubCost01;
	} else if(costFunc === null || costFunc === undefined) {
		this.dCostFunc = costG || SubCost01; //takes care of empty arguments
		this.gapcost = 2.0;
	} else { //resort to defaults since the input cannot be trusted, yet.
		this.gapcost = 2.0;
		this.dCostFunc = SubCost01;
	}
}

inherits(NeedlemanWunsch, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'NeedlemanWunsch';
	},
	getLongDecriptionString: function() {
		return 'Implements the Needleman-Wunsch algorithm providing an edit distance based similarity measure between two strings';
	},
	getdCostFunc: function() {
		return this.dCostFunc;
	},
	setdCostFunc: function(dCostFunc) {
		this.dCostFunc = dCostFunc;
	},
	getGapCost: function() {
		return this.gapcost;
	},
	setGapCost: function(gapcost) {
		this.gapcost = gapcost;
	}
});

NeedlemanWunsch.prototype.getSimilarity = function(str1, str2) {

	var maxV, minV;

	maxV = minV = Math.max(assertType(str1, 'string').length, assertType(str2, 'string').length);

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
	var n = assertType(s, 'string', typeIgnore).length;
	var m = assertType(t, 'string', typeIgnore).length;

	if(n === 0) {
		return m;
	} else if(m === 0) {
		return n;
	} else {
		var _i, _j;

		var v0 = new Array(m + 1)
		var v1 = new Array(m + 1)

		for (_i = 0; _i < v0.length; _i++) {
			v0[_i] = _i;
		}

		for (_i = 0; _i < n; _i++) {

			v1[0] = _i + 1;

			for (_j = 0; _j < m; _j++) {
				v1[_j + 1] = Math.min(v1[_j] + this.gapcost,
							v0[_j + 1] + this.gapcost,
							v0[_j] + this.dCostFunc.getCost(s, _i, t, _j));
			}

			v0 = v1.slice(0);
		}

		return v1[m];
	}
};

module.exports = NeedlemanWunsch;
