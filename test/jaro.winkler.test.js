'use strict';
/**
 * Module dependencies.
 */
var should = require('should');
var JaroWinkler = require('../lib/similaritymetrics/JaroWinkler');

/**
 * Globals
 */
var jaro;

describe('Jaro Winkler Matching', function () {
    beforeEach(function (done) {
        jaro = new JaroWinkler();
        done();
    });

    //straight out of the java version
    it('test strings should match', function() {
        var result = jaro.getSimilarity("Test String1", "Test String2");

        result.should.be.approximately(0.9777778, 0.1);
    });

    it('should return the correct matching prefix', function() {
        var result = jaro.getPrefixLength("A-6435", "A-6500");
        result.should.equal(3);
    });
});
