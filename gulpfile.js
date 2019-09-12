var gulp = require('gulp');
var serve = require('gulp-serve');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var gls = require('gulp-live-server');


gulp.task('views', function(){
  return gulp.src(['build/views/index.pug', 'build/views/pages/*.pug'])
    .pipe(pug())
    .pipe(gulp.dest('public'))
});

gulp.task('styles', function () {
  return gulp.src('./build/styles/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('scripts', function () {
  return gulp.src('./build/scripts/*.js')
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('assets', function () {
  return gulp.src('./build/assets/**/*')
    .pipe(gulp.dest('public/assets'));
});

gulp.task('serve', function() {
  var server = gls([gls.script, 'public', 3000]);
  server.start();

  gulp.watch(['build/**/*'], function(file) {
    gulp.start('views');
    gulp.start('styles');
    gulp.start('scripts');
    gulp.start('assets');
    server.notify.apply(server, [file]);
  });
});
