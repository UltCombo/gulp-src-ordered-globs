**NOTE:** this package should be used with gulp 3.x only, gulp 4's `gulp.src()` will already have this functionality built-in.

# gulp-src-ordered-globs
[![npm version](http://img.shields.io/npm/v/gulp-src-ordered-globs.svg)](https://npmjs.org/package/gulp-src-ordered-globs)
[![Build Status](http://img.shields.io/travis/UltCombo/gulp-src-ordered-globs.svg)](https://travis-ci.org/UltCombo/gulp-src-ordered-globs)
[![Dependency Status](http://img.shields.io/david/UltCombo/gulp-src-ordered-globs.svg)](https://david-dm.org/UltCombo/gulp-src-ordered-globs)
[![devDependency Status](http://img.shields.io/david/dev/UltCombo/gulp-src-ordered-globs.svg)](https://david-dm.org/UltCombo/gulp-src-ordered-globs#info=devDependencies)

`gulp.src()` wrapper which respects the globs array order (for gulp 3.x) - https://github.com/gulpjs/gulp/issues/837

# Install

```
npm install --save-dev gulp-src-ordered-globs
```

# How to use

```js
var gulpSrc = require('gulp-src-ordered-globs');
gulpSrc(['src/**', '!src/**/*.js', 'src/vendor/**/*.js'], { base: 'src' })
	.pipe(gulp.dest('dist'));
```

gulp-src-ordered-globs's signature is pretty much identical to [`gulp.src`'s](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options). Just note that the first argument ***must*** be an array of globs (otherwise you'd get no advantage from using gulp-src-ordered-globs anyway).

# Changelog

- **1.0.2**: Huge refactoring; no longer require `base` option; fix unit tests; change code style; Readme: add note about gulp 4.
- **1.0.1**: update readme example; some little refactoring.
- **1.0.0**: initial release.
