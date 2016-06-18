var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var jshint  = require('gulp-jshint');
var mocha   = require('gulp-mocha');

// ESLint JS linting task
gulp.task('eslint', function (done) {
  return gulp
    .src(['./routes/*', './test/**/*'])
    .pipe(eslint())
    .pipe(eslint.format());
    done();
});

// JS linting task
gulp.task('jshint', function (done) {
  return gulp
    .src(['./routes/*', './test/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
    done();
});

// TODO make gulp.paraller and gulp.series work
//gulp.task('lint', gulp.paraller('eslint', 'jshint'));

// Mocha test task
gulp.task('mocha', function () {
  return gulp
    .src(['./test/**/*', '!./test/temp'])
    .pipe(mocha({
      reporter: 'spec'
    }));
});

//gulp.task('test', gulp.series('mocha', 'lint'));

// The default task (called when you run `gulp` from cli)
gulp.task('default');
