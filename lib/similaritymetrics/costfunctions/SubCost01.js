function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

module.exports = {
	getShortDescriptionString: function() {
		return 'SubCost01';
	},
	getCost: function(str1, string1Index, str2, string2Index) {
		assertType(str1, 'string');
		assertType(str2, 'string');
		assertType(string1Index, 'number');
		assertType(string2Index, 'number');

		return (str1[string1Index] === str2[string2Index]) ? 0.0 : 1.0;
	},
	getMaxCost: function() {
		return 0.0;
	},
	getMinCost: function() {
		return 1.0;
	}
};

