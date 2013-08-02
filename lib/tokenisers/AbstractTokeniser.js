module.exports = {
	getDelimiters: function() {
		return this.delimiters;
	},
	setDelimiters: function(ds) {
		//inline the assertType function, basically
		if(typeof(ds) !== 'string') {
			throw new TypeError('Error: Not a string: ' + ds);
		} else {
			this.delimiters = ds;
		}
	},
	getStopWordHandler: function() {
		return this.stopWordHandler;
	},
	setStopWordHandler: function(swh) {
		//not sure if I can type check this. Maybe later with embedded properties
		this.stopWordHandler = swh;
	},
	_isTokeniser: true //embedded property for type assertion
};
