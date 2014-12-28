// jshint mocha: true
'use strict';

var gulpSrc = require('..');
var assert = require('stream-assert');
require('should');

var fixDir = 'test/fixtures/';

it('should respect the globs order', function(done) {
	gulpSrc([fixDir + '**', '!' + fixDir + '*.txt', fixDir + 'c.txt'])
		.pipe(assert.length(3)) // 3 including the parent directory
		.pipe(assert.any(function(file) {
			file.relative.should.equal('');
		}))
		.pipe(assert.any(function(file) {
			return file.relative.should.equal('b');
		}))
		.pipe(assert.any(function(file) {
			return file.relative.should.equal('c.txt');
		}))
		.pipe(assert.all(function(file) {
			return file.relative.should.not.equal('a.txt');
		}))
		.pipe(assert.end(done));
});

it('should filter out dupes', function(done) {
	gulpSrc([fixDir + '**', fixDir + '**'])
		.pipe(assert.length(4))
		.pipe(assert.end(done));
});

it('should pass the `options` argument to `gulp.src()`', function(done) {
	var base = '.';
	gulpSrc([fixDir + 'a.txt', fixDir + 'b'], { base: base })
		.pipe(assert.length(2))
		.pipe(assert.all(function(file) {
			file.base.should.equal(base);
		}))
		.pipe(assert.end(done));
});

it('should respect the globs order with a single positive glob', function(done) {
	var base = '.';
	gulpSrc(['!' + fixDir + 'b', fixDir + 'b'], { base: base })
		.pipe(assert.length(1))
		.pipe(assert.all(function(file) {
			file.base.should.equal(base);
		}))
		.pipe(assert.end(done));
});
