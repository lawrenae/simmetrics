// Copyright (C) 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Implements StringMap - a map api for strings.
 *
 * @author Mark S. Miller
 * @author Jasvir Nagra

 * @author novacrazy
 */

/*
Notes from novacrazy:

	I changed a few things to make it more Node.js specific and more generic in general
	Added merge, clear and assign into the frozen object, and added the isStringMap function and property.

	I think it all works.

*/

var StringMap = (function() {
	'use strict';

	function constFunc(func) {
		func.prototype = null;
		return Object.freeze(func);
	}

	function assertType(x, t) {
		if (typeof(x) !== t) {
			throw new TypeError('Not a ' + t + ': ' + x);
		}

		return x;
	}

	return function StringMap(parent, mangle_character) {

		//determine mangle character
		var m;

		if (mangle_character != null) {
			m = assertType(mangle_character, 'string');
		} else {
			m = (typeof(parent) === 'string' ? parent : '$');
		}

		//create an object object
		var objAsMap = Object.create(null);

		//copy parent into the internal object with mangling
		if (parent != null && typeof(parent) === 'object') {
			var keys = Object.keys(parent);
			for (var _i = 0, _j = keys.length; _i < _j; _i++) {
				objAsMap[keys[_i] + m] = parent[keys[_i]];
			}
		}

		//return a frozen StringMap wrapper around the inherited-scope internal object
		return Object.freeze({
			//basic operators
			get: constFunc(function(key) {
				return objAsMap[assertType(key, 'string') + m];
			}),
			set: constFunc(function(key, value) {
				objAsMap[assertType(key, 'string') + m] = value;
			}),
			has: constFunc(function(key) {
				return (assertType(key, 'string') + m) in objAsMap;
			}),
			'delete': constFunc(function(key) {
				return delete objAsMap[assertType(key, 'string') + m];
			}),
			//alias of delete
			remove: constFunc(function(key) {
				return delete objAsMap[assertType(key, 'string') + m];
			}),
			//reference to internal (can't be accessed directly by inner functions. Weird, I know)
			internal: objAsMap,
			//This merges an object into the map without top-level assignment, as I believe that would erase the scope and render it meaningless. Or something.
			merge: constFunc(function(obj) {
				var keys = Object.keys(assertType(obj, 'object'));

				for (var _i = 0, _j = keys.length; _i < _j; _i++) {
					objAsMap[keys[_i] + m] = obj[keys[_i]];
				}
				return objAsMap;
			}),
			//this removes all elements from the interal object
			clear: constFunc(function() {
				for (var _i in objAsMap) {
					delete objAsMap[_i];
				}
			}),
			keys: constFunc(function(raw) {
				var keys = Object.keys(objAsMap);

				if(!raw) {
					for(var _i in keys) {
						keys[_i] = keys[_i].slice(0, -(m.length));
					}
				}

				return keys;

			}),
			//This assigns an object into the map without top-level assignment
			//not the, basically, combination of the above two, inlined, because they cannot be accessed from the function scope
			assign: constFunc(function(obj) {
				var _i, _j, keys = Object.keys(assertType(obj, 'object'));

				for (_i in objAsMap) {
					delete objAsMap[_i];
				}

				for (_i = 0, _j = keys.length; _i < _j; _i++) {
					objAsMap[keys[_i] + m] = obj[keys[_i]];
				}

				return objAsMap;
			}),
			//get size of internal map
			size: constFunc(function() {
				return objAsMap.length;
			}),
			//simple contains function
			contains: constFunc(function(key) {
				return ((assertType(key, 'string') + m) in objAsMap);
			}),
			//toString
			toString: constFunc(function(keyonly) {
				var out = '', keys = Object.keys(objAsMap);

				if(!!keyonly) {
					for(var _i in keys) {
						out += keys[_i].slice(0, -(m.length));
					}

				} else {
					for(var _i in keys) {
						out += objAsMap[keys[_i]];
					}
				}

				return out;
			}),
			//for the isStringMap function
			_isStringMap: true
		});
	};

})();


//since StringMap returns an [frozen] object, the embedded property must be used.
StringMap.isStringMap = function(targ) {
	return (targ != null && targ._isStringMap === true);
};

module.exports = StringMap;
