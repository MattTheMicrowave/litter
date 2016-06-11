var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('bundle-dev', function() {
return browserify({
	entries: ['public/src/javascripts/app.js'],
	debug: true
	})
	.bundle()

	.on('error', function(error) {
		console.log(error.toString());
		this.emit('end');
	})

	.pipe(source('bundle.js'))
	.pipe(buffer())

	.pipe(gulp.dest('public/javascripts/'));
	});

	gulp.task('watch', function() {

	gulp.watch('public/src/javascripts/**', ['bundle-dev']);
	});

	gulp.task('default', ['bundle-dev', 'watch']);
