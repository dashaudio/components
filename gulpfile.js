var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var include = require('gulp-file-include');
var sass = require('gulp-sass');
var karma = require('karma');

var POLYFILLS = [
  './node_modules/webcomponents.js/webcomponents.js',
  './node_modules/babel-polyfill/dist/polyfill.js'
];

gulp.task('polyfills', () => {
  gulp.src(POLYFILLS)
    .pipe(concat('polyfills.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('templates', () => {
  return gulp.src('components/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('styles', () => {
  return gulp.src('components/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', () => {
  return gulp.src('components/**/*.js')
    .pipe(gulp.dest('build/'))
    .pipe(include({ prefix: '@' }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify({ wrap: true }))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', () => {
  gulp.watch(['./components/**/*'], ['build']);
});

gulp.task('test', () => {
    return new karma.Server({
      configFile: __dirname + '/karma.conf.js'
    }).start();
});

gulp.task('build', ['polyfills', 'templates', 'styles', 'scripts']);
gulp.task('serve', ['build', 'watch']);
gulp.task('default', ['build']);
