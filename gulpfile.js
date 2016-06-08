var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')

gulp.task('default', ['scripts', 'styles'])

gulp.task('watch', function() {
  gulp.watch('./web/assets/js/**/*.js', ['scripts'])
  gulp.watch('./web/assets/sass/**/*.sass', ['styles'])
})

gulp.task('scripts', function() {
    return gulp.src('./web/assets/js/**/*.js')
               .pipe(concat('combined.js'))
               .pipe(gulp.dest('./web/public/js/'));
})

gulp.task('styles', function () {
  return gulp.src('./web/assets/sass/**/*.sass')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('./web/public/css/'))
})

