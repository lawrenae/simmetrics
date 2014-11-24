
function SubCost1_Minus2() {}


SubCost1_Minus2.prototype.getShortDescriptionString= function() {}
SubCost1_Minus2.prototype.getCost= function(str1, string1Index, str2, string2Index) {
	if(str1.length <= string1Index || string1Index < 0){
		return 0;
	}

	if(str2.length <= string2Index || string2Index < 0) {
		return 0;
	}

	if (str1[string1Index] == str2[string2Index]) {
		return 1.0;
	} else {
		return -2.0;
	}
}
SubCost1_Minus2.prototype.getMaxCost= function() {
	return 1.0;
}
SubCost1_Minus2.prototype.getMinCost= function() {
	return -2.0;
}

module.exports = SubCost1_Minus2;
