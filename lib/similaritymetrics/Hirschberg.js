var util = require('util');

var AbstractStringMetric = require('./AbstractStringMetric');

//appeared to be the fastest for V8 at jsperf.com
function reverseString(input) {
	var ret = '';
	for(var _i = input.length - 1; _i >= 0; _i--) {
		ret += input[_i];
	}

	return ret;
};

function Hirschberg() {}

util.inherits(Hirschberg, AbstractStringMetric);
Hirschberg.prototype.getShortDescriptionString= function() {
	return 'Hirschberg';
};
Hirschberg.prototype.getLongDescriptionString= function() {
	return 'Implements the Hirschberg algorithm that finds the optimal sequence alignment between two strings';
};

Hirschberg.prototype.algorithm_B = function(m, n, a, b, typeIgnore) {
	var _i, _j, k = [Array(n + 1), Array(n + 1)];

	for (_j = 0; _j <= n; _j++) {

		k[1][_j] = 0;
	}


	for (_i = 1; _i <= m; _i++) {

		k[0] = k[1].slice(0);

		for (_j = 1; _j <= n; _j++) {

			if (a[_i - 1] === b[_j - 1]) {
				k[1][_j] = (k[0][_j - 1] + 1);

			} else {
				k[1][_j] = Math.max(k[1][_j - 1], k[0][_j]);
			}
		}
	}

	return k[1];
};

Hirschberg.prototype.algorithm_C = function(m, n, a, b, typeIgnore) {
	var _i, _j, c = '';

	if(n === 0 || m === 0) {
		return '';

	} else if(m === 1) {

		for(_j = 0; _j < n; _j++) {

			if(a[0] === b[_j]) {

				c += a[0];
			}
		}
	} else {
		var k, l1, l2, c1, c2;

		_i = Math.floor(m / 2.0);

		l1 = this.algorithm_B(_i, n, a.slice(0, _i), b, typeIgnore);
		l2 = this.algorithm_B(m - _i, n, reverseString(a.slice(_i)), reverseString(b), typeIgnore);

		k = this.find_K(l1, l2, n);

		c1 = this.algorithm_C(_i, k, a.slice(0, _i), b.slice(0, k), typeIgnore);
		c2 = this.algorithm_C(m - _i, n - k, a.slice(_i), b.slice(k), typeIgnore);

		c = c1 + c2;
	}

	return c;
};

Hirschberg.prototype.find_K = function(l1, l2, n) {
	var m = 0, k = 0, b;

	for(var _j = 0; _j <= n; _j++) {
		b = l1[_j] + l2[n - _j];

		if(m < b) {
			m = b;
			k = _j;
		}
	}

	return k;
};

Hirschberg.prototype.getUnNormalisedSimilarity =
	Hirschberg.prototype.getSimilarity = function(str1, str2) {

		var l2 = str2.length;
		var l1 = str1.length;

		return this.algorithm_C(l1, l2, str1, str2, true);
};

module.exports = Hirschberg;
