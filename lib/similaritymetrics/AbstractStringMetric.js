module.exports = {
	batchCompareSet: function(strs, comparator) {
		var results = [];
		for(var _i in strs) {
			results.push(this.getSimilarity(strs[_i], comparator));
		}

		return results;
	},
	batchCompareSets: function(set1, set2) {
		var results, sh = (set1.length < set2.length ? set1 : set2);
		for(var _i in sh) {
			results.push(this.getSimilarity(set1[_i], set2[_i]));
		}

		return results;
	},
	getSimilarityExplained: function() {
		return '';
	}
}
