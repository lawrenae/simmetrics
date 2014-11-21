'use strict';
/**
 * Module dependencies.
 */
var should = require('should');

var Levenshtein = require('../lib/similaritymetrics/Levenshtein');
var ChapmanMatchingSoundex = require('../lib/similaritymetrics/ChapmanMatchingSoundex');
var TokeniserWhitespace = require('../lib/tokenisers/TokeniserWhitespace');

/**
 * Globals
 */
var leven, chapman;

/**
 * Unit tests
 */
describe('SimMetrics Matching', function () {

    describe('Levenshtein Distance Matching', function () {
        beforeEach(function (done) {
            leven = new Levenshtein();
            done();
        });
        it('should match Andy perfectly', function() {
            var res = leven.getSimilarity('Andy', 'Andy');
            res.should.equal(1);
        });

        it('should match like the java version', function() {
            var result = leven.getSimilarity("Test String1", "Test String2");

            result.should.be.approximately(0.9166667, 0.1);
        });
    });

    describe('SoundEx matching', function() {
        beforeEach(function (done) {
            chapman = new ChapmanMatchingSoundex();
            done();
        });
        it('should match stuff like the java version', function() {
            var result = leven.getSimilarity("Test StringA", "Test StringB");

            result.should.be.approximately(0.95555556, 0.1);
        });
        it('should match like the java version', function() {
            var result = leven.getSimilarity("Test String1", "Test String2");

            result.should.be.approximately(0.95555556, 0.1);
        });
        it('will match Jorge and George with a reasonable score', function() {
            var res = chapman.getSimilarity("Jorge", "George");
            res.should.be.approximately(0.77777785, 0.1);
        });
        it('will match Abrahms and Abrems with a high score', function() {
            var res = chapman.getSimilarity("Abrahms", "Abrems");
            res.should.be.approximately(0.88888, 0.1);
        });
        it('will match Joseph and Jospeh with a high score', function() {
            var res = chapman.getSimilarity("Joseph", "Jospeh");
            res.should.be.approximately(0.8888, 0.1);
        });
        it('will match Barbara and Barbara with a high score', function() {
            var res = chapman.getSimilarity("Barbara", "Barbara");
            res.should.be.approximately(0.95, 0.1);
        });
        it('will match Aroldin and Aaron with a high score', function() {
            var res = chapman.getSimilarity("Aroldin", "Aaron");
            res.should.be.approximately(0.3, 0.1);
        });
    });
});
