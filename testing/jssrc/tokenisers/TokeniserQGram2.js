var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractTokeniser = require('./AbstractTokeniser');

var DummyStopTermHandler = require('./../wordhandlers/DummyStopTermHandler');

function assertType(x, t) {
	if (typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function TokeniserQGram2() {
	this.stopWordHandler = new DummyStopTermHandler();
}

inherits(TokeniserQGram2, AbstractTokeniser, {
	getShortDescriptionString: function() {
		return 'TokeniserQGram2';
	}
});

TokeniserQGram2.prototype.tokenizeToArray = function(input) {

	var term, len = assertType(input, 'string').length - 1;

	var arr = [];

	for(var _i = 0; _i < len; _i++) {
		term = input.substring(_i, _i + 2);
		if(!this.stopWordHandler.isWord(term)) {
			arr.push(term);
		}
	}

	return arr;
};

//although this really returns an array, it is of the unique elements
TokeniserQGram2.prototype.tokenizeToSet = function(input) {
	return lodash.unique(this.tokenizeToArray(input));
};

module.exports = TokeniserQGram2;

