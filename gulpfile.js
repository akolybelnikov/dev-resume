const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const cssnano = require('gulp-cssnano');
const uncss = require('gulp-uncss');

gulp.task("sass", function() {
  return gulp
    .src("assets/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(browserSync.reload, {
      end: false
    })
    .pipe(gulp.dest("assets/css"));
});


gulp.task("reload", function(done) {
  browserSync.reload();
  done();
});

gulp.task("watch", function() {
  gulp.watch("assets/scss/**/*.scss", gulp.series("sass", "reload"));
});

gulp.task("watch-html", function() {
  gulp.watch("*.html", gulp.series("reload"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: ".",
    port: 4000
  });
});

gulp.task("live-server", gulp.series("serve", "watch"));

gulp.task("default", function() {
  return gulp
    .src("assets/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uncss({
      html: ['index.html']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest("assets/css"));
})