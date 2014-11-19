var StringMap = require('./../StringMap');
var lodash = require('lodash');
var util = require('util');

var AbstractWordHandler = require('./AbstractWordHandler');

function DummyStopTermHandler() {
	this.wordSet = null;
}

util.inherits(DummyStopTermHandler, AbstractWordHandler);

DummyStopTermHandler.prototype.getShortDescriptionString = function() {
	return 'DummyStopTermHandler';
}
DummyStopTermHandler.prototype.isWord = function() {
	return false;
}

DummyStopTermHandler.prototype.addWord = DummyStopTermHandler.prototype.dummy_func;
DummyStopTermHandler.prototype.removeWord = DummyStopTermHandler.prototype.dummy_func;
DummyStopTermHandler.prototype.getNumberOfWords = function() {return 0;};
DummyStopTermHandler.prototype.getWordsAsString = function() {return '';}

module.exports = DummyStopTermHandler;
