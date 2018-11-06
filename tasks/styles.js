var config = require('../gulp-config')().styles,
  gulp = require('gulp'),
  sass = require('gulp-sass');


// tasks definitions
gulp.task('styles:compile', compileStyles);
gulp.task('styles:copy-normalize', copyNormalizeStyles);


// methods definitions
function compileStyles() {
  return gulp
    .src(config.src.app)
    .pipe(
      sass()
      .on('error', sass.logError)
    )
    .pipe(gulp.dest(config.dest));
}

function copyNormalizeStyles() {
  return gulp
    .src(config.src.normalize)
    .pipe(gulp.dest(config.dest));
}
