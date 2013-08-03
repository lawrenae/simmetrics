var inherits = require('./../inherits');
var lodash = require('lodash');

var AbstractStringMetric = require('./AbstractStringMetric');
var JaroWinkler = require('./JaroWinkler');

function assertType(x, t) {
	if(typeof(x) !== t) {
		throw new TypeError('Error: Not a ' + t + ': ' + x);
	}

	return x;
}

var SOUNDEXLENGTH = 6;
var SOUNDEXLENGTH4 = SOUNDEXLENGTH * 4;

function Soundex(metricToUse) {
	this.iSM = metricToUse || (new JaroWinkler());
}

inherits(Soundex, AbstractStringMetric, {
	getShortDecriptionString: function() {
		return 'Soundex';
	},
	getLongDecriptionString: function() {
		return 'Implements the Soundex algorithm providing a similarity measure between two soundex codes';
	}
});

Soundex.prototype.getSimilarity = function(str1, str2) {
	//type checking done within these
	var s1 = this.soundex(str1, SOUNDEXLENGTH);
	var s2 = this.soundex(str2, SOUNDEXLENGTH);

	return this.iSM.getSimilarity(s1, s2);
};

Soundex.prototype.getUnNormalisedSimilarity = function(str1, str2) {
	return this.iSM.getUnNormalisedSimilarity(str1, str2); //type checking done within
};

Soundex.prototype.soundex = function(input, len) {

	if(assertType(input, 'string').length === 0) {
		return '';

	} else {

		//null and undefined are less than 4, so it does assume a default value of 4
		len = (len > 10 ? 10 : (len < 4 ? 4 : len));

		input = input.toUpperCase().replace(/[^A-Z]/g, ' ').replace(/\s+/g, '');

		if(input.length === 0) {
			return '';

		} else {
			var tmpStr, lastChar, firstChar, cur;

			tmpStr = lastChar = '-';
			firstChar = input[0];

			if(input.length > (SOUNDEXLENGTH4 + 1)) {
				input = '-' + input.substring(1, SOUNDEXLENGTH4);
			} else {
				input = '-' + input.slice(1);
			}

			//optimized to only process through once
			input = input.replace(/([AEIOUWH])|([BPFV])|([CSKGJQXZ])|([DT])|(L)|([MN])|(R)/g, function(m, _0, _1, _2, _3, _4, _5, _6) {
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

			for(var _i in input) {
				cur = input[_i];

				if(cur !== lastChar) {
					tmpStr += cur;
					lastChar = cur;
				}
			}

			/*

				BREAKING CHANGE:
					originally, it added a hyphen between the first letter and the numeric results. That was silly, so I'm removing it

			*/

			input = firstChar + tmpStr.slice(1).replace(/0/g, '') + '000000000000000000';

			return input.slice(0, len);
		}
	}
};

module.exports = Soundex;
