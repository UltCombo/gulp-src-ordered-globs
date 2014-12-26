'use strict';

var src = require('gulp').src,
	filter = require('gulp-filter'),
	merge = require('merge-stream'),
	unique = require('unique-stream'),
	globManip = require('glob-manipulate');

module.exports = function(globs, options) {
	if (!Array.isArray(globs)) throw new Error('`globs` argument must be an array');
	if (!options || !options.base) throw new Error('`options.base` is required');

	var sortedGlobs = [], // [{src, filter}]
		curGlobType,
		curGlobObj;

	globs.forEach(function(glob) {
		var globType = globManip.isNegative(glob) ? 'filter' : 'src';

		// ignore leading negative globs
		if (globType === 'filter' && !sortedGlobs.length) return;

		if (curGlobType !== globType) {
			curGlobType = globType;
			if (globType === 'src') sortedGlobs.push(curGlobObj = {});
		}
		(curGlobObj[globType] = curGlobObj[globType] || []).push(glob);
	});

	return sortedGlobs.reduce(function(outStream, globs) {
		var stream = src(globs.src, options);
		outStream = outStream ? merge(outStream, stream) : stream;
		if (globs.filter) outStream = outStream.pipe(
			filter(['**'].concat(globManip.unprefix(globs.filter, options.base)))
		);
		return outStream;
	}, undefined).pipe(unique('path'));
};
