/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const coffee = require('gulp-coffee');
//exec = require('gulp-exec')
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const paths = {
  scripts:  'src/**/*.coffee',
  tests:    'test/src/**/*.coffee',
  grammars: 'src/**/*.jison'
};

const onError = function(err) {
  gutil.log(err);
  gutil.beep();
  return this.emit('end');
};

const onCoffeeError = function(err) {
  const message = (err != null ? err.stack : undefined) || `${err}`;
  return onError.call(this, message);
};

gulp.task('clean', () => del(['lib']));

gulp.task('scripts', () => gulp.src(paths.scripts)
  .pipe(sourcemaps.init())
  .pipe(coffee({coffee: require('coffeescript')}).on('error', onCoffeeError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('lib')));

gulp.task('tests', () => gulp.src(paths.tests)
  .pipe(sourcemaps.init())
  .pipe(coffee({coffee: require('coffeescript')}).on('error', onError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('test/lib')));
/*
gulp.task 'grammars', ->
  gulp.src(paths.grammars)
    .pipe(jison({ moduleType: 'commonjs' }).on('error', onError))
    .pipe(gulp.dest('lib'));
*/
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  return gulp.watch(paths.tests, ['tests']);
});
  //gulp.watch paths.grammars, ['grammars']

//gulp.task 'default', ['watch', 'scripts', 'tests', 'grammars']
gulp.task('default', ['watch', 'scripts', 'tests']);
