import gulp from 'gulp'
import connect from 'gulp-connect'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import nano from 'gulp-cssnano'
import replace from 'gulp-token-replace'
import rollup from 'rollup-stream'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
// var karma = require('karma');

import { version } from './package.json'

const DOMAIN = process.env.DOMAIN || ''

gulp.task('components', () => {
  return rollup('rollup.config.js')
    .pipe(source('components.js'))
    .pipe(replace({ global: { domain: DOMAIN } }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
})

gulp.task('styles', () => {
  gulp.src('components/components.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(replace({ global: { domain: DOMAIN } }))
    .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
})

gulp.task('fonts', () => {
  gulp.src('fonts/**')
    .pipe(gulp.dest('build/fonts/'))
    .pipe(connect.reload())
})

gulp.task('images', () => {
  gulp.src('images/**')
    .pipe(gulp.dest('build/images/'))
    .pipe(connect.reload())
})

gulp.task('guide', () => {
  return gulp.src('guide/**/*.{html,css}')
    .pipe(gulp.dest('build/guide/'))
    .pipe(connect.reload())
})

//

gulp.task('watch', () => {
  gulp.watch(['./components/**'], ['components'])
  gulp.watch(['./components/**/*.scss'], ['styles'])
  gulp.watch(['./fonts/**'], ['fonts'])
  gulp.watch(['./images/**'], ['images'])
  gulp.watch(['./guide/**'], ['guide'])
});

gulp.task('connect', () => {
  connect.server({ root: 'build/', liveReload: true })
});

// gulp.task('test', (done) => {
//     return new karma.Server({
//       configFile: __dirname + '/karma.conf.js'
//     }, done).start();
// });

gulp.task('build', ['components', 'styles', 'fonts', 'images', 'guide']);
gulp.task('serve', ['build', 'connect', 'watch']);
gulp.task('default', ['build']);
