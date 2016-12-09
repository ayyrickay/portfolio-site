/* jshint node: true */
'use strict'

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    imageop       = require('gulp-image-optimization'),
    cp            = require('child_process'),
    plumber       = require('gulp-plumber'),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync'),
    cmq           = require('gulp-combine-mq')

// Uses Sass compiler to process styles, adds vendor prefixes, minifies,
// and then outputs file to appropriate location(s)
gulp.task('sass', function (done) {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cmq({beautify: false}))
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream())
})

gulp.task('images', function (cb) {
  gulp.src(['_img/**/*.png', '_img/**/*.jpg']).pipe(imageop({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  })).pipe(gulp.dest('assets/img').on('end', cb).on('error', cb))
})

// Run Jekyll Build Asynchronously
gulp.task('build:jekyll', function (done) {
  browserSync.notify('Building Jekyll')
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done)
})

gulp.task('jekyll-rebuild', ['build:jekyll'], function () {
  browserSync.reload()
})

gulp.task('browser:sync', ['build:jekyll'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    },
    host: 'localhost'
  })
})

gulp.task('watch', function () {
  // watch .scss files
  gulp.watch('assets/scss/**/*.scss', ['sass'])
  // watch html files
  gulp.watch(['index.html',
              '_includes/*.html',
              '_layouts/*.html',
              'work/*/*.html',
              '*.md'],
              ['jekyll-rebuild'])
})

gulp.task('default', function () {
  gulp.start('sass', 'browser:sync', 'watch')
})
