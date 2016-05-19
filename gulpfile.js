'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
/*自动检测*/
var borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload,
    watch = require('gulp-watch');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});

gulp.task('sass', function() {
    return gulp.src('./modules/istudy/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./modules/istudy/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./modules/isstudy/sass/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
    borwserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('modules/**/sass/*.scss', ['sass']);
    gulp.watch("*.html").on('change', reload);
});
// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
