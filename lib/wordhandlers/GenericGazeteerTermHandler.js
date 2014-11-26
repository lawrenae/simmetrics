var util = require('util');
var StringMap = require('./../StringMap');
var lodash = require('lodash');

var AbstractWordHandler = require('./AbstractWordHandler');

function GenericGazeteerTermHandler() {
	this.wordSet = StringMap();
}

util.inherits(GenericGazeteerTermHandler, AbstractWordHandler);
GenericGazeteerTermHandler.prototype.getShortDescriptionString: function() {
	return 'GenericGazeteerTermHandler';
};

GenericGazeteerTermHandler.prototype.isWord = function(term) {
	return this.wordSet.contains(term);
};

GenericGazeteerTermHandler.prototype.getWordsAsString = function() {
	return this.wordSet.toString(true);
};

module.exports = GenericGazeteerTermHandler;
