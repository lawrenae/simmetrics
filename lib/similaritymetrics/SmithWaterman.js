var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var SubCost1_Minus2 = require('./costfunctions/SubCost1_Minus2');

function assertType(x, t, ignore) {
	if(!ignore && typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function SmithWaterman(costG, costFunc) {
	if(lodash.isNumber(costG)) {
		this.gapcost = costfG;
		this.dCostFunc = costFunc || SubCost1_Minus2;
	} else if(costFunc === null || costFunc === undefined) {
		this.dCostFunc = costG || SubCost1_Minus2; //takes care of empty arguments
		this.gapcost = 0.5;
	} else { //resort to defaults since the input cannot be trusted, yet.
		this.gapcost = 0.5;
		this.dCostFunc = SubCost1_Minus2;
	}
}

inherits(SmithWaterman, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'SmithWaterman';
	},
	getLongDecriptionString: function() {
		return 'Implements the Smith-Waterman algorithm providing a similarity measure between two strings';
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

SmithWaterman.prototype.getSimilarity = function(str1, str2) {
	var maxV = Math.min(assertType(str1, 'string').length, assertType(str2, 'string').length);

	if(maxV !== 0) {

		var maxC = this.dCostFunc.getMaxCost();

		var co = (maxC > -this.gapcost) ? maxC : -this.gapcost;

		if(co === 0) {
			return 1.0;

		} else {
			return (this.getUnNormalisedSimilarity(str1, str2, true) / (maxV * co));
		}

	} else {
		return 1.0;
	}
};

SmithWaterman.prototype.getUnNormalisedSimilarity = function(s, t, typeIgnore) {
	var n = assertType(s, 'string', typeIgnore).length;
	var m = assertType(t, 'string', typeIgnore).length;

	if(n === 0) {
		return m;

	} else if(m === 0) {
		return n;

	} else {
		var _i, _j, max = 0.0;

		//by doing the matrix generation in-place I gain about 45% speedup.

		var d = [Array(n)];

		d[0][0] = Math.max(0, -this.gapcost, this.dCostFunc.getCost(s, 0, t, 0));

		//add dimensions and fill m-axis
		for(var _i = 1; _i < n; _i++) {
			var a = [Math.max(0, d[_i - 1][0] - this.gapcost, this.dCostFunc.getCost(s, _i, t, 0))];
			a.length = n;
			d[_i] = a;

			if(a[0] > max) {
				max = a[0];
			}
		}

		//fill n-axis
		for(var _j = 1, _c; _j < m; _j++) {
			d[0][_j] = _c = Math.max(0, d[0][_j - 1] - this.gapcost, this.dCostFunc.getCost(s, 0, t, _j));

			if(_c > max) {
				max = _c;
			}
		}

		for(_i = 1; _i < n; _i++) {
			for(_j = 1, _c; _j < m; _j++) {

				d[_i][_j] = _c = Math.max(0,
									d[_i - 1][_j] + this.gapcost,
									d[_i][_j - 1] + this.gapcost,
									d[_i - 1][_j - 1] +  this.dCostFunc.getCost(s, _i, t, _j));

				if(_c > max) {
					max = _c;
				}
			}
		}

		return max;
	}
};

module.exports = SmithWaterman;
