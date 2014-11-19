
function SubCost01() {}

SubCost01.prototype.getShortDescriptionString = function() {
	return 'SubCost01';
}

SubCost01.prototype.getCost = function(str1, string1Index, str2, string2Index) {
	return (str1[string1Index] === str2[string2Index]) ? 0.0 : 1.0;
}

SubCost01.prototype.getMaxCost = function() {
	return 0.0;
}

SubCost01.prototype.getMinCost = function() {
	return 1.0;
}

module.exports = SubCost01;
