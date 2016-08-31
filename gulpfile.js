var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	pump = require('pump');

gulp.task('minify', function (cb) {
	
	pump([
			gulp.src('src/*.js'),
			uglify(),
			gulp.dest('dist')
		],
		cb
	);

});


