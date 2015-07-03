var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('minify', [], function() {
	return gulp.src('./linal.js')
	.pipe(concat('linal.min.js'))
	.pipe(uglify({ mangle: { keep_fnames: true }, compress: { keep_fnames: true } }))
	.pipe(gulp.dest('.'));
});

gulp.task('validate', [], function() {
	return gulp.src('./linal.js')
	.pipe(jshint({ multistr: true }))
	.pipe(jshint.reporter('default'));
});

gulp.task('test', ['minify'], function() {
	return gulp.src(['./test/linal.js', './test/*.js', './test/**/*.js'])
	.pipe(concat('test.js'))
	.pipe(gulp.dest('.'))
	.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('watch', function() {
	gulp.watch(['./linal.js', 'src/*', './src/**/*'], ['default']);
});

gulp.task('default', [
	'validate',
	'minify'
]);
