'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var debug = require('gulp-debug');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'routes/*.js', 'public/js/*.js'];
var htmlFiles = ['./server/views/*.ejs'];

gulp.task('style', function () {
  return gulp.src(jsFiles)
    .pipe(debug({title: 'style:'}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task('inject', function () {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src([
    'public/css/*.css',
    'public/js/*.js'
  ]);

  var injectOptions = {
    ignorePath: '/public'
  };

  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../public'
  };

  return gulp.src(htmlFiles)
    .pipe(wiredep(options))
    .pipe(debug({title: 'inject:'}))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('.server/views'));
});

gulp.task('serve', ['style', 'inject'], function(){
  var options = {
    script: 'app.js',
    delayTime: 1,
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function(){
      console.log('Restarting ...');
    });
});