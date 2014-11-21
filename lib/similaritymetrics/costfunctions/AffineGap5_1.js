
function AffineGap5_1() {

}

AffineGap5_1.prototype.getShortDescriptionString = function() {
	return 'AffineGap5_1';
}

AffineGap5_1.prototype.getCost = function(stringToGap, stringIndexStartGap, stringIndexEndGap) {
	if(stringIndexStartGap >= stringIndexEndGap) {
		return 0.0;
	} else {
		return 5.0 - ((stringIndexEndGap - 1) - stringIndexStartGap);
	}
}
AffineGap5_1.prototype.getMaxCost = function() {
	return 5.0;
}
AffineGap5_1.prototype.getMinCost = function() {
	return 0.0;
}

module.exports = AffineGap5_1
