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
	this.delimiters = assertType(delimiters || WhiteSpaceDelimiters, 'string'); //might as well add some customization ability.
	this.stopWordHandler = new DummyStopTermHandler();
}

inherits(TokeniserWhitespace, AbstractTokeniser, {
	getShortDescriptionString: function() {
		return 'TokeniserWhitespace';
	}
});

TokeniserWhitespace.prototype.tokenizeToArray = function(input) {
	assertType(input, 'string');

	var ch, nextGapPos, term, testPos, arr = [];
	for (var _i in input) {
		ch = input[_i];

		if(isWhitespace(ch)) {
			_i++;
		}

		nextGapPos = input.length;

		for(var _j in this.delimiters) {
			testPos = input.indexOf(this.delimiters[_j], _i);
			if(testPos < nextGapPos && testPos !== -1) {
				nextGapPos = testPos;
			}
		}

		term = input.substring(_i, nextGapPos);

		if(!this.stopWordHandler.isWord(term) && term.trim().length > 0) {
			arr.push(term);
		}

		_i = nextGapPos; //skip ahead
	}

	return arr;
};

TokeniserWhitespace.prototype.tokenizeToSet = function(input) {
	return lodash.unique(this.tokenizeToArray(input));
};

module.exports = TokeniserWhitespace;
