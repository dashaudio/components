import gulp from 'gulp'
import connect from 'gulp-connect'
import sass from 'gulp-sass'
import render from 'gulp-nunjucks-render'
import rename from 'gulp-rename'
import add from 'gulp-add-src'
import sourcemaps from 'gulp-sourcemaps'
import nano from 'gulp-cssnano'
import replace from 'gulp-token-replace'
import rollup from 'rollup-stream'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
// var karma = require('karma');

import { version } from './package.json'
import config from './components/config.json'

const DASH_ASSETS_BASE = process.env.DASH_ASSETS_BASE || ''

gulp.task('components', () => {
  return rollup('rollup.config.js')
    .pipe(source('components.js'))
    .pipe(replace({ global: { domain: DASH_ASSETS_BASE, config } }))
    .pipe(buffer())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
})

gulp.task('styles', () => {
  gulp.src('components/components.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(replace({ global: { domain: DASH_ASSETS_BASE, config } }))
    .pipe(nano({ safe: true }))
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
  return gulp.src('guide/**/*.html')
    .pipe(render({ path: 'guide/', data: { domain: DASH_ASSETS_BASE, version, config } }))
    .pipe(add('guide/**/*.css'))
    .pipe(gulp.dest('build/guide/'))
})

gulp.task('home', () => {
  return gulp.src('guide/home.html')
    .pipe(rename('index.html'))
    .pipe(render({ path: 'guide/', data: { domain: DASH_ASSETS_BASE, version, config } }))
    .pipe(gulp.dest('build/'))
})

gulp.task('watch', () => {
  gulp.watch(['./components/**'], ['components'])
  gulp.watch(['./components/**/*.scss'], ['styles'])
  gulp.watch(['./fonts/**'], ['fonts'])
  gulp.watch(['./images/**'], ['images'])
  gulp.watch(['./guide/**'], ['guide', 'home'])
});

gulp.task('connect', () => {
  connect.server({ root: 'build/', liveReload: true })
});

gulp.task('test', (done) => {
  // return new karma.Server({
  //   configFile: __dirname + '/karma.conf.js'
  // }, done).start();
});

gulp.task('build', ['components', 'styles', 'fonts', 'images', 'guide', 'home']);
gulp.task('serve', ['build', 'connect', 'watch']);
gulp.task('default', ['build']);
