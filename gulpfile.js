const gulp = require('gulp')
const sass = require('gulp-sass');

gulp.task('sass', function () {   
    return gulp.src('assets/scss/devresume.scss')
           .pipe(sass())
           .pipe(gulp.dest('assets/css')) 
 })