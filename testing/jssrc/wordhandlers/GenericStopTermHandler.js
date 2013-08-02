var inherits = require('./../inherits');
var StringMap = require('./../StringMap');
var lodash = require('lodash');

var AbstractWordHandler = require('./AbstractWordHandler');

function assertType(x, t) {
	if (typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

function GenericStopTermHandler() {
	this.wordSet = StringMap();
}

inherits(GenericStopTermHandler, AbstractWordHandler, {
	getShortDescriptionString: function() {
		return 'GenericStopTermHandler';
	}
});

GenericStopTermHandler.prototype.isWord = function(term) {
	return this.wordSet.contains(term);
};

GenericStopTermHandler.prototype.getWordsAsString = function() {
	return this.wordSet.toString(true);
};

module.exports = GenericStopTermHandler;
