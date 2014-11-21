'use strict';
/**
 * Module dependencies.
 */
var should = require('should');
var SmithWatermanGotohWindowedAffine = require('../lib/similaritymetrics/SmithWatermanGotohWindowedAffine');

/**
 * Globals
 */
var smg;

describe('SmithWatermanGotohWindowedAffine Matching', function () {
    beforeEach(function (done) {
        smg = new SmithWatermanGotohWindowedAffine();
        done();
    });

    //straight out of the java version
    it('test strings should match', function() {
        var result = smg.getSimilarity("Test String1", "Test String2");

        result.should.be.approximately(0.9166667, 0.1);
    });
});
