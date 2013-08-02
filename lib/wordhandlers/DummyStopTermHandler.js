var inherits = require('./../inherits');
var StringMap = require('./../StringMap');
var lodash = require('lodash');

var AbstractWordHandler = require('./AbstractWordHandler');

function DummyStopTermHandler() {
	this.wordSet = null;
}

inherits(DummyStopTermHandler, AbstractWordHandler._dummy, {
	getShortDescriptionString: function() {
		return 'DummyStopTermHandler';
	},
	isWord: function() {
		return false;
	}
});

module.exports = DummyStopTermHandler;
