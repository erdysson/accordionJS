/**
 * Created by erdi.taner.gokalp on 25/10/15.
 */

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    minify = require("gulp-minify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps");

gulp.task("webServer", function() {
  connect.server({
    livereload: true
  });
});

gulp.task("accordion", function() {
  gulp.src("accordion/accordion.js")
    .pipe(sourcemaps.init())
    .pipe(minify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/accordion"))
    .pipe(connect.reload());

  gulp.src("accordion/accordion.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/accordion"))
    .pipe(connect.reload());
});

gulp.task("dev", function() {
  gulp.src("demo/**/**.*")
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch("accordion/accordion.*", ["accordion"]);
  gulp.watch("demo/**/**.*", ["dev"]);
});

gulp.task("default", ["webServer", "accordion", "dev", "watch"]);