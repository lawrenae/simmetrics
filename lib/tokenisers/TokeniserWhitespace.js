var lodash = require('lodash');
var util = require('util');
var AbstractTokeniser = require('./AbstractTokeniser');
var DummyStopTermHandler = require('./../wordhandlers/DummyStopTermHandler');

//As you may be able to tell, I went all out on what is Whitespace

//manual comparisons are much faster than other methods, probably due to short-circuits and stuff.
function isWhitespace(i) {
	return (i === ' ' || i === '\n' || i === '\t' || i === '\r' || i === '\v' || i === '\f' ||
		i === '\u0020' || i === '\u00A0' || i === '\u1680' || i === '\u180E' ||
		(i >= '\u2000' && i <= '\u200A') || i === '\u2028' || i === '\u2029' ||
		i === '\u202F' || i === '\u205F' || i === '\u00A0' ||i === '\u3000');
}

var WhiteSpaceDelimiters = ' \n\t\r\v\f\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u00A0\u3000';

function TokeniserWhitespace(delimiters) {
	this.delimiters = delimiters || WhiteSpaceDelimiters; //might as well add some customization ability.
	this.stopWordHandler = new DummyStopTermHandler();
}

util.inherits(TokeniserWhitespace, AbstractTokeniser);

TokeniserWhitespace.prototype.getShortDescriptionString = function() {
	return 'TokeniserWhitespace';
}

TokeniserWhitespace.prototype.tokenizeToArray = function(input) {
	var ch, nextGapPos, term, testPos, returnVect = [];
	var curPos = 0;

	while (curPos < input.length) {
		ch = input[curPos];

		if(isWhitespace(ch)) {
			curPos++;
		}

		nextGapPos = input.length;

		//check delimiters
		for(var _j in this.delimiters) {
			testPos = input.indexOf(this.delimiters[_j], curPos);
			if(testPos < nextGapPos && testPos !== -1) {
				nextGapPos = testPos;
			}
		}

		//add new token
		term = input.substring(curPos, nextGapPos);

		if(!this.stopWordHandler.isWord(term) && term.trim().length > 0) {
			returnVect.push(term);
		}

		curPos = nextGapPos; //skip ahead
	}

	return returnVect;
};

TokeniserWhitespace.prototype.tokenizeToSet = function(input) {
	return lodash.unique(this.tokenizeToArray(input));
};

module.exports = TokeniserWhitespace;
