var util = require('util');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var JaroWinkler = require('./JaroWinkler');

var SOUNDEXLENGTH = 6;
var SOUNDEXLENGTH4 = SOUNDEXLENGTH * 4;

function RawSoundex(wordString, soundExLen) {
	//null and undefined are less than 4, so it does assume a default value of 4
	soundExLen = (soundExLen > 10 ? 10 : (soundExLen < 4 || (soundExLen === null || soundExLen === undefined) ? 4 : soundExLen));

	wordString = wordString.toUpperCase().replace(/[^A-Z]/g, ' ').replace(/\s+/g, '');

	if(wordString.length === 0) {
		return '';
	}

	var tmpStr, lastChar, firstChar, cur;

	tmpStr = lastChar = '-';
	firstChar = wordString[0];

	if(wordString.length > (SOUNDEXLENGTH4 + 1)) {
		wordString = '-' + wordString.substring(1, SOUNDEXLENGTH4);
	} else {
		wordString = '-' + wordString.slice(1);
	}

	//optimized to only process through once
	wordString = wordString.replace(/([AEIOUWH])|([BPFV])|([CSKGJQXZ])|([DT])|(L)|([MN])|(R)/g, function(m, _0, _1, _2, _3, _4, _5, _6) {
		switch(false) {
			case !_0: return '0';
			case !_1: return '1';
			case !_2: return '2';
			case !_3: return '3';
			case !_4: return '4';
			case !_5: return '5';
			case !_6: return '6';
		}
	});

	for(var _i in wordString) {
		curChar = wordString[_i];

		if(curChar !== lastChar) {
			tmpStr += curChar;
			lastChar = curChar;
		}
	}

	wordString = firstChar + '-' + tmpStr.slice(1).replace(/0/g, '') + '000000000000000000';

	return wordString.slice(0, soundExLen);
};

function Soundex(input, len) {
	var isinstance = (this instanceof Soundex);

	if(!isinstance && input != null) {
		return RawSoundex(input, len);

	} else if(isinstance) {
		this.iSM = input || (new JaroWinkler());
	}
}

util.inherits(Soundex, AbstractStringMetric);

Soundex.prototype.getShortDecriptionString = function() {
	return 'Soundex';
}

Soundex.prototype.getLongDecriptionString = function() {
	return 'Implements the Soundex algorithm providing a similarity measure between two soundex codes';
}

Soundex.prototype.getSimilarity = function(str1, str2) {
	//type checking done within these
	var s1 = this.soundex(str1, SOUNDEXLENGTH);
	var s2 = this.soundex(str2, SOUNDEXLENGTH);

	return this.iSM.getSimilarity(s1, s2);
};

Soundex.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	return this.iSM.getUnNormalisedSimilarity(str1, str2); //type checking done within
};

Soundex.prototype.soundex = RawSoundex;

module.exports = Soundex;
