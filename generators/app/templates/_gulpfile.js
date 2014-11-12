'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var size = require('gulp-size');
var inject = require("gulp-inject");
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var sequence = require('run-sequence');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var wiredep = require('wiredep').stream;
var usemin = require('gulp-usemin');
var angularFilesort = require('gulp-angular-filesort');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./build"
    }
  });
});

gulp.task('watch', ['browser-sync'], function () {
	gulp.watch("src/index.html", ['html']);
	gulp.watch("src/**/*.scss", ['sass']);
	gulp.watch("app/app/**/*.tpl", ['templates']);
  gulp.watch("src/app/**/*.js", ['js']);
});

gulp.task('clean', function () {
	return gulp.src('build/*', {read: false})
    .pipe(clean());
});

gulp.task('html', function () {
  var target = gulp.src('src/index.html');
  var css = gulp.src(['css/**/*.css'], {read: false, cwd: 'build/'});
  var js = gulp.src(['app/**/*.js'], {read: false, cwd: 'build/'});

  var wireDepOptions = {
  	directory: 'src/bower_modules/',
    bowerJson: require('./bower.json')
  };

  var htmlMinOptions = {
  	empty: true
  };

  return target
  	.pipe(size({title:"html before"}))
  	.pipe(inject(css))
  	.pipe(inject(js))
  	.pipe(wiredep(wireDepOptions))
  	.pipe(usemin({
      css: [minifyCss(), 'concat'],
      js: [uglify(), 'concat'],
      html: [minifyHtml(htmlMinOptions)]
    }))
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}))
    .pipe(size({title:"html after"}));
});

gulp.task('templates', function () {
  var htmlMinOptions = {
    empty: true
  };

  return gulp.src('app/**/*.tpl', {cwd: 'src/'})
    .pipe(size({title:"tpl before"}))
    .pipe(minifyHtml(htmlMinOptions))
    .pipe(templateCache('templates.min.js', {module: '<%= _.slugify(appname) %>'}))
    .pipe(gulp.dest('build/app'))
    .pipe(reload({stream:true}))
    .pipe(size({title:"tpl after"}));
});

gulp.task('sass', function () {
	return gulp.src(['src/**/*.scss', '!src/bower_modules/**/*'])
		.pipe(size({title:"sass before"}))
		.pipe(sass())
		.pipe(flatten())
		.pipe(concat('app.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('build/css'))
		.pipe(reload({stream:true}))
		.pipe(size({title:"sass after"}));
});

gulp.task('js', function () {
	return gulp.src(['src/app/**/*.js', '!src/app/**/*.spec.js'])
		.pipe(size({title:"js before"}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
    .pipe(angularFilesort())
    .pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('build/app'))
		.pipe(reload({stream:true}))
		.pipe(size({title:"js after"}));
});

gulp.task('build', function (next) {
	sequence(
		'clean',
		'sass',
    'templates',
		'js',
		'html',
		'watch',
		next
	);
});

gulp.task('default', ['build']);