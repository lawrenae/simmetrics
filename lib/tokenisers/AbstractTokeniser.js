function AbstractTokeniser() {}

AbstractTokeniser.prototype.getDelimiters = function() {
	return this.delimiters;
}
AbstractTokeniser.prototype.setDelimiters = function(ds) {
	//inline the assertType function, basically
	if(typeof(ds) !== 'string') {
		throw new TypeError('Error: Not a string: ' + ds);
	} else {
		this.delimiters = ds;
	}
}
AbstractTokeniser.prototype.getStopWordHandler = function() {
	return this.stopWordHandler;
}

AbstractTokeniser.prototype.setStopWordHandler = function(swh) {
	//not sure if I can type check this. Maybe later with embedded properties
	this.stopWordHandler = swh;
}
AbstractTokeniser.prototype._isTokeniser = true; //embedded property for type assertion


module.exports = AbstractTokeniser;
