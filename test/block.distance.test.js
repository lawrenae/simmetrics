'use strict';
/**
 * Module dependencies.
 */
var should = require('should');
var BlockDistance = require('../lib/similaritymetrics/BlockDistance');

/**
 * Globals
 */
var metric;

describe('Block Distance Matching', function () {
    beforeEach(function (done) {
        metric = new BlockDistance();
        done();
    });

    //straight out of the java version
    it('test strings should match', function() {
        var result = metric.getSimilarity("Test String1", "Test String2");
        result.should.be.approximately(0.5, 0.1);
    });
    it('Neu strings should match', function() {
        var result = metric.getSimilarity("NNeu", "Neu");
        result.should.be.approximately(0.0, 0.1);
    });
});
