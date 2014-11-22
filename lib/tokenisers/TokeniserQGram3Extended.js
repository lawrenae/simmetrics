var util = require('util');
var lodash = require('lodash');

var AbstractTokeniser = require('./AbstractTokeniser');
var DummyStopTermHandler = require('./../wordhandlers/DummyStopTermHandler');

function TokeniserQGram3Extended() {
	this.stopWordHandler = new DummyStopTermHandler();
}

util.inherits(TokeniserQGram3Extended, AbstractTokeniser);

TokeniserQGram3Extended.prototype.getShortDescriptionString = function() {
	return 'TokeniserQGram3Extended';
}

TokeniserQGram3Extended.prototype.tokenizeToArray = function(input) {
	input = '##' + input + '##';

	var term, len = input.length - 1;

	var arr = [];

	for(var _i = 0; _i < len; _i++) {
		term = input.substring(_i, _i + 3);
		if(!this.stopWordHandler.isWord(term)) {
			arr.push(term);
		}
	}

	return arr;
};

//although this really returns an array, it is of the unique elements
TokeniserQGram3Extended.prototype.tokenizeToSet = function(input) {
	return lodash.unique(this.tokenizeToArray(input));
};

module.exports = TokeniserQGram3Extended;
