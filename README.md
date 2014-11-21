JavaScript port of the SimMetrics Java library plus more.
===

This is a further fork from msamblet's version. I'm focused on a few additional things:
- Make this library produce the same values as the java version (important!) So far this means better results for
	- ChapmanMatchingSoundex
	- Levenshtein
	- MongeElken
	- SmithWatermanGotoh
- Automated testing
- Work with node.js

I've also added SmithWatermanGotoh metrics support.

##Use
```
npm install
npm install -g mocha
```
and then to run all the tests:
```
mocha
```

##General Description

Hand-optimized and re-factored to provide clean and fast string similarity algorithms for JavaScript developers.

Although this is designed for Node.js, I will provide a browser version sometime in the future (or if anyone would like to contribute one).

So far, nearly all parts of the library have been ported. Algorithms left to be added are:

	TagLink
	TagLinkToken

I should have those up very soon.

###A note I should make: 
I did not include the original timing tests for each one. I think they are unnecessary. However, as they can be useful sometimes, I will include them sometime as seperate modules which can be merged into the algorithms.

##Soundex Notes
Soundex works as an object created by new, in which case the normal soundex function is called as instance.soundex(input[, length]); OR you can simply call the Soundex function directly as Soundex(input[, length]);

Also, it does not include the hyphen between the leading letter and the soundex numbers.
