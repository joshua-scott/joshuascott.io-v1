const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('styles', () => {
  return gulp.src('./*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['styles'], () => {

  browserSync.init({
    server: './'
  });

  gulp.watch('./*.scss', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);