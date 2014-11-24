'use strict';
/**
 * Module dependencies.
 */
var should = require('should');
var ChapmanOrderedNameCompoundSimilarity = require('../lib/similaritymetrics/ChapmanOrderedNameCompoundSimilarity');

/**
 * Globals
 */
var metric;

describe('ChapmanOrderedNameCompoundSimilarity Matching', function () {
    beforeEach(function (done) {
        metric = new ChapmanOrderedNameCompoundSimilarity();
        done();
    });

    //straight out of the java version
    it('test strings should match', function() {
        var result = metric.getSimilarity("Test String1", "Test String2");
        result.should.be.approximately(0.9553572, 0.1);
    });

    it('Neu strings should match', function() {
        var result = metric.getSimilarity("NNeu", "Neu");
        result.should.be.approximately(0.6, 0.1);
    });
});
