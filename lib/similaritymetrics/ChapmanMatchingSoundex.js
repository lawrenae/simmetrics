var inherits = require('./../inherits');
var util = require('util');

var MongeElkan = require('./MongeElken');
var Soundex = require('./Soundex');
var TokeniserWhitespace = require('./../tokenisers/TokeniserWhitespace');

var ESTIMATEDTIMINGCONST = 0.026571428571428571428571428571429;

function ChapmanMatchingSoundex(tokeniserToUse) {
	if(tokeniserToUse != null) {
		MongeElkan.call(this, tokeniserToUse, new Soundex());
	}
	else {
		MongeElkan.call(this, new TokeniserWhitespace(), new Soundex());
	}
}

util.inherits(ChapmanMatchingSoundex, MongeElkan);

ChapmanMatchingSoundex.prototype.getShortDescriptionString = function() {
		return 'ChapmanMatchingSoundex';
}

ChapmanMatchingSoundex.prototype.getLongDescriptionString = function() {
		return 'Implements the Chapman Matching Soundex algorithm whereby terms are matched and tested against the standard soundex algorithm - this is intended to provide a better rating for lists of proper names.';
}

module.exports = ChapmanMatchingSoundex;
