var config = require('./gulp-config')(),
  gulp = require('gulp'),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence');

  
// require tasks directory
requireDir('./tasks', { recurse: true });


// tasks
gulp.task('build', build);


// tasks definitions
function build() {
  runSequence(
    'styles:compile',
    'styles:copy-normalize'
  );
}
