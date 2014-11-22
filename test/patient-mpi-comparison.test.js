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
    MongeElken = require('../lib/similaritymetrics/MongeElken'),
    NeedlemanWunsch = require('../lib/similaritymetrics/NeedlemanWunsch'),
    NeedlemanWunschLite = require('../lib/similaritymetrics/NeedlemanWunschLite'),
    OverlapCoefficient = require('../lib/similaritymetrics/OverlapCoefficient'),
    QGramsDistance = require('../lib/similaritymetrics/QGramsDistance'),
    SmithWatermanGotoh = require('../lib/similaritymetrics/SmithWatermanGotoh'),
    SoundEx = require('../lib/similaritymetrics/SoundEx'),
    TokeniserWhitespace = require('../lib/tokenisers/TokeniserWhitespace');

/**
 * Unit tests
 */
describe('MPI Metric comparison:', function () {
    it('create output', function (done) {
        var metrics = [BlockDistance,ChapmanLengthDeviation,
                        ChapmanMatchingSoundex,ChapmanMeanLength,
                        ChapmanOrderedNameCompoundSimilarity,CosineSimilarity,DamerauLevenshtein,
                        DiceSimilarity,EuclideanDistance,Hirschberg,JaccardSimilarity,
                        Jaro,JaroWinkler,Levenshtein,LevenshteinLite,MatchingCoefficient,
                        MongeElken,NeedlemanWunsch,NeedlemanWunschLite,OverlapCoefficient,
                        QGramsDistance,SmithWatermanGotoh,SoundEx
                      ];

        var csvArray = [];
        csvArray.push(['#left', '#right', '#metric', '#score']);
        
        metrics.forEach(function(metric) {
            var m = new metric();
            fs.readFile('./test/mpi-input.csv', 'utf8', function(err, input) {
                csvParser.parse(input, {comment: '#'}, function(err, output) {
                    output.forEach(function(row) {
                        var score = m.getSimilarity(row[0], row[1]);
                        csvArray.push([row[0], row[1], metric.name, score]);
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