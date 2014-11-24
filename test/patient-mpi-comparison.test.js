'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    fs = require('fs'),
    csvParser = require('csv');

var BlockDistance = require('../lib/similaritymetrics/BlockDistance'),
    ChapmanLengthDeviation = require('../lib/similaritymetrics/ChapmanLengthDeviation'),
    ChapmanMatchingSoundex = require('../lib/similaritymetrics/ChapmanMatchingSoundex'),
    ChapmanMeanLength = require('../lib/similaritymetrics/ChapmanMeanLength'),
    ChapmanOrderedNameCompoundSimilarity = require('../lib/similaritymetrics/ChapmanOrderedNameCompoundSimilarity'),
    CosineSimilarity = require('../lib/similaritymetrics/CosineSimilarity'),
    DamerauLevenshtein = require('../lib/similaritymetrics/DamerauLevenshtein'),
    DiceSimilarity = require('../lib/similaritymetrics/DiceSimilarity'),
    EuclideanDistance = require('../lib/similaritymetrics/EuclideanDistance'),
    Hirschberg = require('../lib/similaritymetrics/Hirschberg'),
    JaccardSimilarity = require('../lib/similaritymetrics/JaccardSimilarity'),
    Jaro = require('../lib/similaritymetrics/Jaro'),
    JaroWinkler = require('../lib/similaritymetrics/JaroWinkler'),
    Levenshtein = require('../lib/similaritymetrics/Levenshtein'),
    LevenshteinLite = require('../lib/similaritymetrics/LevenshteinLite'),
    MatchingCoefficient = require('../lib/similaritymetrics/MatchingCoefficient'),
    MongeElkan = require('../lib/similaritymetrics/MongeElkan'),
    NeedlemanWunch = require('../lib/similaritymetrics/NeedlemanWunch'),
    NeedlemanWunchLite = require('../lib/similaritymetrics/NeedlemanWunchLite'),
    OverlapCoefficient = require('../lib/similaritymetrics/OverlapCoefficient'),
    QGramsDistance = require('../lib/similaritymetrics/QGramsDistance'),
    SmithWatermanGotoh = require('../lib/similaritymetrics/SmithWatermanGotoh'),
    SoundEx = require('../lib/similaritymetrics/SoundEx'),
    TokeniserWhitespace = require('../lib/tokenisers/TokeniserWhitespace');

/**
 * Unit tests
 */
describe('MPI Metric comparison:', function () {
    it('create output (test-results.csv)', function (done) {
        var metrics = [BlockDistance,ChapmanLengthDeviation,
                        ChapmanMatchingSoundex,ChapmanMeanLength,
                        ChapmanOrderedNameCompoundSimilarity,CosineSimilarity,DamerauLevenshtein,
                        DiceSimilarity,EuclideanDistance,Hirschberg,JaccardSimilarity,
                        Jaro,JaroWinkler,Levenshtein,LevenshteinLite,MatchingCoefficient,
                        MongeElkan,NeedlemanWunch,NeedlemanWunchLite,OverlapCoefficient,
                        QGramsDistance,SmithWatermanGotoh,SoundEx
                      ];

        var csvArray = [];
        csvArray.push(['#LastName','#FirstName','#CorrectLastName','#CorrectFirstName','#My best score','#metric', '#firstScore', '#lastScore']);

        metrics.forEach(function(metric) {
            var m = new metric();
            fs.readFile('./test/mpi-input.csv', 'utf8', function(err, input) {
                csvParser.parse(input, {comment: '#'}, function(err, output) {
                    output.forEach(function(row) {
                        var firstScore = m.getSimilarity(row[0], row[2]);
                        var lastScore = m.getSimilarity(row[1], row[3]);
                        csvArray.push([row[0], row[1], row[2], row[3], row[4], metric.name, firstScore, lastScore]);
                    });
                    csvParser.stringify(csvArray, function(err, data) {
                        // console.log(data);
                        fs.writeFile('./test-results.csv', data, function(){});
                    });
                });
            });
        });
        done();
    });
});
