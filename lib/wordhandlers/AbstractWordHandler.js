/*

	NOTES:
		wordSet is an instance of a StringMap object

*/

//might as well share the instance to cut back on memory as much as possible

function AbstractWordHandler() {

}

AbstractWordHandler.prototype.dummy_func = function() {}

AbstractWordHandler.prototype.addWord = function(term) {
	this.wordSet.set(term, 0); //meaningless value, making it act like a set.
}
AbstractWordHandler.prototype.removeWord = function(term) {
	return this.wordSet.remove(term);
}
AbstractWordHandler.prototype.getNumberOfWords = function() {
	return this.wordSet.size();
}

module.exports = AbstractWordHandler;
