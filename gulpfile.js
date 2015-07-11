// include gulp
var gulp = require('gulp');
 
// include plug-ins
var connect		= require('gulp-connect-php');
var livereload	= require('gulp-livereload');
var jshint		= require('gulp-jshint');
var concat		= require('gulp-concat');
var uglify		= require('gulp-uglify');
var rename		= require('gulp-rename'); 
var minify		= require('gulp-minify');
var less		= require('gulp-less');

gulp.task('webserver', function() {
	connect.server({
		hostname: '0.0.0.0',
		base: "public/",
		livereload: true
	});
});

gulp.task('scripts', function() {
	return gulp.src(['resources/js/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('public/assets/js/'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/assets/js/'));
});

gulp.task('styles', function() {
	gulp.src('resources/less/main.less')
		.pipe(less())
		.pipe(minify())
		.pipe(gulp.dest('public/assets/css'))
});


gulp.task('watch', function() {
	gulp.watch('resources/less/*.less', ['styles']);
	gulp.watch('resources/js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'webserver', 'watch']);