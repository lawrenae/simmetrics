function AbstractStringMetric() {}

AbstractStringMetric.prototype.batchCompareSet = function(strs, comparator) {
	var results = [];
	for(var _i in strs) {
		results.push(this.getSimilarity(strs[_i], comparator));
	}

	return results;
}

AbstractStringMetric.prototype.batchCompareSets = function(set1, set2) {
	var results, sh = (set1.length < set2.length ? set1 : set2);
	for(var _i in sh) {
		results.push(this.getSimilarity(set1[_i], set2[_i]));
	}

	return results;
}

AbstractStringMetric.prototype.getSimilarityExplained = function() {
	return '';
}

AbstractStringMetric.prototype._isSimMetric = true

module.exports = AbstractStringMetric
