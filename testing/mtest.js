var lodash = require('lodash');


var n = 10, m = 5;

var d = [[]];
d[0].length = n; //preallocate rather than pushe

for(var _i = 0; _i <= n; _i++) {
	var a = [_i];
	a.length = n; //preallocate, again;
	d[_i] = a;
}

for(var _j = 0; _j <= n; _j++) {
	d[0][_j] = _j;
}

console.log(d)
