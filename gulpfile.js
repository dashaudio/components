var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var karma = require('karma');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-rollup');
var string = require('rollup-plugin-string');
var sass = require('rollup-plugin-sass');

gulp.task('polyfills', () => {
  gulp.src('./node_modules/webcomponents.js/webcomponents.js')
    .pipe(concat('polyfills.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('components', () => {
  return gulp.src(['components/components.js'])
    .pipe(rollup({
      plugins: [string({ extensions: ['.html'] }), sass()],
      sourceMap: true
    }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify({ wrap: true }))
    .pipe(sourcemaps.write('.'))
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

gulp.task('build', ['polyfills', 'components']);
gulp.task('serve', ['build', 'watch']);
gulp.task('default', ['build']);
