var util = require('util');
var lodash = require('lodash');

var AbstractTokeniser = require('./AbstractTokeniser');

var DummyStopTermHandler = require('./../wordhandlers/DummyStopTermHandler');

function TokeniserQGram2Extended() {
	this.stopWordHandler = new DummyStopTermHandler();
}

util.inherits(TokeniserQGram2Extended, AbstractTokeniser);
TokeniserQGram2Extended.prototype.getShortDescriptionString= function() {
	return 'TokeniserQGram2Extended';
}

TokeniserQGram2Extended.prototype.tokenizeToArray = function(input) {

	input = '#' + input + '#';

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
TokeniserQGram2Extended.prototype.tokenizeToSet = function(input) {
	return lodash.unique(this.tokenizeToArray(input));
};

module.exports = TokeniserQGram2Extended;
