/*

	NOTES:
		wordSet is an instance of a StringMap object

*/

//might as well share the instance to cut back on memory as much as possible
function dummy_func() {}

module.exports = {
	addWord: function(term) {
		this.wordSet.set(term, 0); //meaningless value, making it act like a set.
	},
	removeWord: function(term) {
		return this.wordSet.remove(term);
	},
	getNumberOfWords: function() {
		return this.wordSet.size();
	},
	_dummy: {
		addWord: dummy_func,
		removeWord: dummy_func,
		getNumberOfWords: function() {return 0;},
		getWordsAsString: function() {return '';}
	}
};
