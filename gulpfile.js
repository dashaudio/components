var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var babel = require('rollup-plugin-babel');
var uglify = require('gulp-uglify');
var karma = require('karma');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('rollup-stream');
var string = require('rollup-plugin-string');
var sass = require('rollup-plugin-sass');
var json = require('rollup-plugin-json');
var npm = require('rollup-plugin-node-resolve');
var cjs = require('rollup-plugin-commonjs');
var inline = require('gulp-base64');
var streamify = require('gulp-streamify');
// var inline = require('gulp-css-base64');
var source = require('vinyl-source-stream');

const LIBRARIES = [
  './node_modules/webcomponents.js/webcomponents.js',
  './node_modules/whatwg-fetch/fetch.js',
  './node_modules/moment/moment.js',
  './bower_components/auth0-lock/build/auth0-lock.js'
];

gulp.task('libraries', () => {
  gulp.src(LIBRARIES)
    .pipe(concat('libraries.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('build/'));
});
// Ok, now just got to work out how to get inline images working again...
gulp.task('components', () => {
  return rollup({
      entry: 'components/components.js',
      plugins: [
        string({ extensions: ['html'] }),
        sass(),
        json(),
        babel({ presets: ['es2015-rollup'], babelrc: false }),
        npm({ jsnext: true })
      ],
      sourceMap: true
    })
    .pipe(source('components.js'))
    .pipe(streamify(inline({ baseDir: './components' })))
    // .pipe(babel({ presets: ['es2015'] }))
    // .pipe(uglify({ wrap: true }))
    // .pipe(sourcemaps.write('.'))
    // .pipe(connect.reload())
    .pipe(gulp.dest('build/'));
});

gulp.task('guide', () => {
  return gulp.src('guide/**/*.{html,css}')
    .pipe(connect.reload())
    .pipe(gulp.dest('build/guide/'));
});

gulp.task('watch', () => {
  gulp.watch(['./components/**/*'], ['components', 'test']);
  gulp.watch(['./guide/**/*'], ['guide']);
});

gulp.task('connect', () => {
  connect.server({
    root: 'build/',
    liveReload: true
  });
});

gulp.task('test', (done) => {
    return new karma.Server({
      configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('build', ['libraries', 'components', 'guide']);
gulp.task('serve', ['build', 'test', 'connect', 'watch']);
gulp.task('default', ['build']);
