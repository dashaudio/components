var gulp = require('gulp');
var concat = require('gulp-concat');
var template = require('gulp-template-compile');

// gulp.task('templates', () => {
//   return gulp.src('./components/dash/*.html')
//     .pipe(concat('all.html'))
//     .pipe(gulp.dest('build/templates/'));
// });

gulp.task('templates', () => {
  return gulp.src('dash/**/*.html')
    .pipe(template())
    .pipe(gulp.dest('build/templates/'));
});

gulp.task('scripts', () => {
  return gulp.src('dash/**/*.js')
    .pipe(gulp.dest('build/scripts/'))
});


gulp.task('default', ['scripts', 'templates']);
