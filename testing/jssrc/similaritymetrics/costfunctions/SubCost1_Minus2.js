function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

module.exports = {
	getShortDescriptionString: function() {

	},
	getCost: function(str1, string1Index, str2, string2Index) {
		assertType(str1, 'string');
		assertType(str2, 'string');
		assertType(string1Index, 'number');
		assertType(string2Index, 'number');

		if(string1Index > 0 && string2Index > 0 && string1Index < str1.length && string2Index < str2.length) {
			return (str1[string1Index] === str2[string2Index]) ? 1.0 : -2.0;
		} else {
			return 0.0;
		}
	},
	getMaxCost: function() {
		return 1.0;
	},
	getMinCost: function() {
		return -2.0;
	}
};
