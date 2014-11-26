var util = require('util');
var StringMap = require('./../StringMap');
var lodash = require('lodash');

var AbstractWordHandler = require('./AbstractWordHandler');

function GenericStopTermHandler() {
	this.wordSet = StringMap();
}

util.inherits(GenericStopTermHandler, AbstractWordHandler);
GenericStopTermHandler.prototype.getShortDescriptionString= function() {
	return 'GenericStopTermHandler';
};

GenericStopTermHandler.prototype.isWord = function(term) {
	return this.wordSet.contains(term);
};

GenericStopTermHandler.prototype.getWordsAsString = function() {
	return this.wordSet.toString(true);
};

module.exports = GenericStopTermHandler;
