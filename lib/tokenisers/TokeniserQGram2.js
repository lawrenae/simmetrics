var util = require('util');
var lodash = require('lodash');

var AbstractTokeniser = require('./AbstractTokeniser');

var DummyStopTermHandler = require('./../wordhandlers/DummyStopTermHandler');

function TokeniserQGram2() {
	this.stopWordHandler = new DummyStopTermHandler();
}

util.inherits(TokeniserQGram2, AbstractTokeniser);
TokeniserQGram2.prototype.getShortDescriptionString= function() {
	return 'TokeniserQGram2';
}

TokeniserQGram2.prototype.tokenizeToArray = function(input) {

	var term, len = input.length - 1;

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
