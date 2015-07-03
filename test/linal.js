var assert = require('assert');
var linal = require('./linal.min.js');

assert.floatEqual = function(a, b) {
	assert(typeof a === 'number' && typeof b === 'number' && a.toFixed(5) === b.toFixed(5), a + " ≈ " + b);
};
