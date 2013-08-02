/*

	Really useful all-around inheritance function for inheritance to and from both objects and functions (prototyping).

	It is used everywhere, since it makes multiple inheritance and syntactic sugars easier.

*/
var assert = require('assert');
var lodash = require('lodash');
var __slice = Array.prototype.slice;

module.exports = function inherits(output) {
	var input = __slice.call(arguments, 1);

	if(lodash.isObject(output)) {
		for(var _i in input) {
			if(lodash.isFunction(input[_i])) {
				var k = Object.keys(input[_i].prototype);
				for(var _j in k) {
					output[k[_j]] = input[_i].prototype[k[_i]];
				}
			} else if(lodash.isObject(input[_i])) {
				for(var _j in input[_i]) {
					output[_j] = input[_i][_j];
				}
			} else {
				throw new TypeError('Error: inherits can only inherit from objects or functions');
			}
		}
	} else if(lodash.isFunction(output)) {
		for(var _i in input) {
			if(lodash.isFunction(input[_i])) {
				var k = Object.keys(input[_i].prototype);
				for(var _j in k) {
					output.prototype[k[_j]] = input[_i].prototype[k[_j]];
				}
			} else if(lodash.isObject(input[_i])) {
				for(var _j in input[_i]) {
					output.prototype[_j] = input[_i][_j];
				}
			} else {
				throw new TypeError('Error: inherits can only inherit from objects or functions');
			}
		}
	} else {
		throw new TypeError('Error: inherits can only inherit to objects or functions');
	}

	return output;
}
