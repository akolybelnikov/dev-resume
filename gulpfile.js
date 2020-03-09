const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const cssnano = require("gulp-cssnano");
const uncss = require("gulp-uncss");
var critical = require("critical");
const image = require('gulp-image');

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

  gulp.watch("assets/scss/*scss", gulp.series("sass"));
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

// Generate & Inline Critical-path CSS
gulp.task(
  "critical",
  gulp.series("default", function(cb) {
    return critical.generate({
      inline: true,
      base: ".",
      src: "index.html",
      dest: "index-critical.html",
      width: 320,
      height: 480,
      minify: true
    });
  })
);

gulp.task('image', function () {
  return gulp.src('./assets/raw-images/*')
    .pipe(image())
    .pipe(gulp.dest('./assets/images'));
});
