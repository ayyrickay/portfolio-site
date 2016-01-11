'use strict';

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    sass          = require('gulp-sass'),
    shell         = require('gulp-shell'),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync');


//compile SASS
gulp.task('sass', function(){
  gulp.src('_assets/_scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('_assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
});

// Run Jekyll Build Asynchronously
gulp.task('build:jekyll', function () {
    browserSync.notify('Building Jekyll');
    return shell.task(['jekyll build']);
});

gulp.task('jekyll-rebuild', ['jekyll:build'], function(){
  browserSync.reload();
});

gulp.task('browser:sync', ['build:jekyll'], function(){
  browserSync({
    server:{
      baseDir: '_site'
    },
    host: 'localhost'
  });
});

gulp.task('watch', function(){
  //watch .scss files
  gulp.watch('_assets/scss/**/*/.scss', ['sass']);
  //watch html files
  gulp.watch(['index.html',
              '_includes/*.html',
              '_layouts/*.html',
              '*.md'],
              ['jekyll-rebuild']);
});

gulp.task('default', function(){
  gulp.start('sass', 'browser:sync', 'watch')
});
