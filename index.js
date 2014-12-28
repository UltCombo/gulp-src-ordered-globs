'use strict';

var src = require('gulp').src;
var merge = require('merge-stream');
var unique = require('unique-stream');
var globManip = require('glob-manipulate');

module.exports = function(globs, options) {
	if (!Array.isArray(globs)) throw new Error('`globs` argument must be an array');

	var positives = [];
	var negatives = [];

	globs.forEach(function(glob, index) {
		var globArray = globManip.isNegative(glob) ? negatives : positives;
		globArray.push({
			index: index,
			glob: glob
		});
	});

	if (!positives.length) throw new Error('Missing positive glob');
	if (positives.length === 1) return createStream(positives[0]);

	return merge.apply(undefined, positives.map(createStream)).pipe(unique('path'));

	function createStream(positive) {
		var negativeGlobs = negatives.filter(indexGreaterThan(positive.index)).map(toGlob);
		return src([positive.glob].concat(negativeGlobs), options);
	}
};

function indexGreaterThan(index) {
	return function(obj) {
		return obj.index > index;
	};
}

function toGlob(obj) {
	return obj.glob;
}
