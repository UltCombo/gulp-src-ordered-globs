// jshint mocha: true
'use strict';

var gulpSrc = require('..'),
	assert = require('stream-assert'),
	base = 'test/fixtures/';

it('should respect globs order', function(done) {
	gulpSrc([base + '**', '!' + base + '*.txt', base + 'c.txt'], { base: base })
		.pipe(assert.length(3)) // 3 including the parent directory
		.pipe(assert.any(function(file) {
			return file.relative === '';
		}))
		.pipe(assert.any(function(file) {
			return file.relative === 'b';
		}))
		.pipe(assert.any(function(file) {
			return file.relative === 'c.txt';
		}))
		.pipe(assert.all(function(file) {
			return file.relative !== 'a.txt';
		}))
		.pipe(assert.end(done));
});

it('should filter out dupes', function(done) {
	gulpSrc([base + '**', base + '**'], { base: base })
		.pipe(assert.length(4))
		.pipe(assert.end(done));
});
