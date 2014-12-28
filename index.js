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
	if (positives.length === 1) {
		var negativeGlobs = negatives.filter(indexGreaterThan(positives[0].index)).map(toGlob);
		return src([positives[0].glob].concat(negativeGlobs), options);
	}

	return merge.apply(undefined,
		positives.map(function(positive) {
			var negativeGlobs = negatives.filter(indexGreaterThan(positive.index)).map(toGlob);
			return src([positive.glob].concat(negativeGlobs), options);
		})
	).pipe(unique('path'));
};

function indexGreaterThan(index) {
	return function(obj) {
		return obj.index > index;
	};
}

function toGlob(obj) {
	return obj.glob;
}
