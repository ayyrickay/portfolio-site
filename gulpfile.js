/* jshint node: true */
'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var imageop = require('gulp-image-optimization')
var cp = require('child_process')
// var plumber = require('gulp-plumber')
var autoprefixer = require('gulp-autoprefixer')
// var notify = require('gulp-notify')
var browserSync = require('browser-sync')
var cmq = require('gulp-combine-mq')
var hashsum = require('gulp-hashsum')

gulp.task('sass', function (done) {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cmq({beautify: false}))
    .pipe(hashsum({filename: '_data/cache_buster.yml', hash: 'md5'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream())
})

gulp.task('images', function (cb) {
  gulp.src(['_img/**/*.png', '_img/**/*.jpg']).pipe(imageop({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest('assets/img').on('end', cb).on('error', cb))
})

// Run Jekyll Build Asynchronously
gulp.task('build:jekyll', function (done) {
  browserSync.notify('Building Jekyll')
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done)
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
  gulp.watch('assets/scss/**/*.scss', ['sass'])
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
