function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

module.exports = {
	getShortDescriptionString: function() {
		return 'AffineGap5_1';
	},
	getCost: function(stringToGap, stringIndexStartGap, stringIndexEndGap) {
		assertType(stringToGap, 'string');
		assertType(stringIndexStartGap, 'number');
		assertType(stringIndexEndGap, 'number');

		if(stringIndexStartGap >= stringIndexEndGap) {
			return 0.0;
		} else {
			return 5.0 - ((stringIndexEndGap - 1) - stringIndexStartGap);
		}
	},
	getMaxCost: function() {
		return 5.0;
	},
	getMinCost: function() {
		return 0.0;
	}
};

