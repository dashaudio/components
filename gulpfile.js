var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var include = require('gulp-include');

var template = require('gulp-template-compile');

var LIBRARIES = [
  './node_modules/webcomponents.js/webcomponents.js',
  './node_modules/babel-polyfill/dist/polyfill.js'
];

gulp.task('libraries', () => {
  gulp.src(LIBRARIES)
    .pipe(concat('libraries.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('components:scripts', () => {
  return gulp.src('dash/components.js')
    .pipe(include())
    .pipe(concat('dash.js'))
    .pipe(babel({ presets: ['es2015'] }))
    // .pipe(uglify({ wrap: true }))
    .pipe(gulp.dest('build/'));
});

gulp.task('components:templates', () => {
  return gulp.src('dash/**/*.html')
    .pipe(template())
    .pipe(gulp.dest('build/templates/'));
});

gulp.task('components:styles', () => {
  return gulp.src('dash/**/*.html')
    .pipe(template())
    .pipe(gulp.dest('build/templates/'));
});



gulp.task('watch', () => {
  gulp.watch(['./dash/**/*.js'], ['components:scripts']);
  gulp.watch(['./dash/**/*.html'], ['components:templates']);
  gulp.watch(['./dash/**/*.scss'], ['components:styles']);
});

gulp.task('build', ['libraries', 'components:scripts', 'components:templates']);
gulp.task('serve', ['build', 'watch']);
gulp.task('default', ['build']);
