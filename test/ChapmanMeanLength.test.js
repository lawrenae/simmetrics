'use strict';
/**
 * Module dependencies.
 */
var should = require('should');
var ChapmanMeanLength = require('../lib/similaritymetrics/ChapmanMeanLength');

/**
 * Globals
 */
var metric;

describe('ChapmanMeanLength Matching', function () {
    beforeEach(function (done) {
        metric = new ChapmanMeanLength();
        done();
    });

    //straight out of the java version
    it('test strings should match', function() {
        var result = metric.getSimilarity("Test String1", "Test String2");
        result.should.be.approximately(0.17861295, 0.1);
    });

    it('Neu strings should match', function() {
        var result = metric.getSimilarity("NNeu", "Neu");
        result.should.be.approximately(0.05, 0.1);
    });
});
