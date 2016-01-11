'use strict';

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    sass          = require('gulp-sass'),
    shell         = require('gulp-shell'),
    autoprefixer  = require('gulp-autoprefixer'),
    livereload    = require('gulp-livereload'),
    lr            = require('tiny-lr'),
    server        = lr();



//compile SASS
gulp.task('sass', function(){
  gulp.src('_assets/_scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('_assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(livereload(server));
});

// Run Jekyll Build Asynchronously
gulp.task('build', function () {
    shell.task(['jekyll build']);
});

/*gulp.task('serve', function(){
  var server = express();
  server.use(express.static(EXPRESS_ROOT));
  server.listen(EXPRESS_PORT, '0.0.0.0');
});*/

gulp.task('watch', function(){
  server.listen(4000, function(err){
    if(err)
      return console.log(err);

      gulp.watch('_assets/_scss/**/*.scss', ['sass']);

      gulp.watch(['*.html', '*/*.html', '*/*.md', '!_site/**', '!_site/*/**'], ['build']);
  });
});

gulp.task('default', ['sass', 'build', 'watch']);
