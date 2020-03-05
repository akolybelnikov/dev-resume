const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const cssnano = require("gulp-cssnano");
const uncss = require("gulp-uncss");

gulp.task("sass", function() {
  return gulp
    .src("assets/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 4000
  });

  gulp.watch("assets/scss/*scss", gulp.series('sass'));
  gulp.watch("index.html").on("change", browserSync.reload);
});

gulp.task("live-server", gulp.series("serve"));

gulp.task("default", function() {
  return gulp
    .src("assets/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(
      uncss({
        html: ["index.html"]
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("assets/css"));
});
