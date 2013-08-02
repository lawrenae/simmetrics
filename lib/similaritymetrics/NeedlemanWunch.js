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

function NeedlemanWunch(costG, costFunc) {
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

inherits(NeedlemanWunch, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'NeedlemanWunch';
	},
	getLongDecriptionString: function() {
		return 'Implements the Needleman-Wunch algorithm providing an edit distance based similarity measure between two strings';
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

NeedlemanWunch.prototype.getSimilarity = function(str1, str2) {
	var needlemanWunch = this.getUnNormalisedSimilarity(assertType(str1, 'string'), assertType(str2, 'string'), true);

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

		if(minV < 0) {
			maxV -= minV;
			needlemanWunch -= minV;
		}

		return 1.0 - (needlemanWunch / maxV);

	} else {
		return 1.0;
	}
};

//basically the same of the Levenshtein one, but with an additional gapcost instead of just one
NeedlemanWunch.prototype.getUnNormalisedSimilarity = function(s, t, typeIgnore) {
	var n = assertType(s, 'string', typeIgnore).length;
	var m = assertType(t, 'string', typeIgnore).length;

	if(n === 0) {
		return m;
	} else if(m === 0) {
		return n;
	} else {
		var _i, _j, cost;

		//by doing the matrix generation in-place I gain about 45% speedup.

		var d = [[]];
		d[0].length = n; //preallocate rather than push

		//add dimensions and fill m-axis
		for(var _i = 0; _i <= n; _i++) {
			var a = [_i]; //put seed value in first spot
			a.length = n; //preallocate, again.
			d[_i] = a; //insert row into matrix
		}

		//fill n-axis
		for(var _j = 0; _j <= n; _j++) {
			d[0][_j] = _j;
		}


		for(_i = 1; _i <= n; _i++) {
			for(_j = 1; _j <= m; _j++) {
				cost = this.dCostFunc.getCost(s, _i - 1, t, _j - 1);

				d[_i][_j] = Math.min(d[_i - 1][_j] + this.gapcost,
									d[_i][_j - 1] + this.gapcost,
									d[_i - 1][_j - 1] +  cost);
			}
		}
		return d[n][m];
	}
};

module.exports = NeedlemanWunch;
