const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['styles'], () => {

  browserSync.init({
    server: './'
  });

  gulp.watch('./scss/**/*.scss', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);