JavaScript port of the SimMetrics Java library
===

Hand-optimized and re-factored to provide clean and fast string similarity algorithms for JavaScript developers.

Although this is designed for Node.js, I will provide a browser version sometime in the future (or if anyone would like to contribute one).

So far, nearly all parts of the library have been ported. Algorithms left to be added are:

	SmithWaterman
	SmithWatermanGotoh
	SmithWatermanGotohWindowedAffine
	TagLink
	TagLinkToken

I should have those up very soon.

A note I should make: I did not include the original timing tests for each one. I think they are unnecessary.

Also, breaking change on the Soundex algorithm. To do a raw Soundex, you create an instance of Soundex, then call the function soundex within it. Furthermore, there is no hyphen between the first letter and the numbers, as there was in the Java SimMetrics. It was useless and non-standard.
