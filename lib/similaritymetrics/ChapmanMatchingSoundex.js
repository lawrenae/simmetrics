var inherits = require('./../inherits');

var MongeElkan = require('./MongeElkan');
var Soundex = require('./Soundex');

function ChapmanMatchingSoundex(tokeniserToUse) {
	if(tokeniserToUse != null) {
		MongeElkan.call(this, tokeniserToUse, new Soundex());
	}
	else {
		MongeElkan.call(this, new Soundex());
	}
}

inherits(ChapmanMatchingSoundex, MongeElkan, {
	getShortDescriptionString: function() {
		return 'ChapmanMatchingSoundex';
	},
	getLongDescriptionString: function() {
		return 'Implements the Chapman Matching Soundex algorithm whereby terms are matched and tested against the standard soundex algorithm - this is intended to provide a better rating for lists of proper names.';
	}
});

module.exports = ChapmanMatchingSoundex;
