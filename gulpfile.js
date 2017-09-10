const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('styles', () => {
  return gulp.src('./*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['styles'], () => {

  browserSync.init({
    server: './'
  });

  gulp.watch('./*.css', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);