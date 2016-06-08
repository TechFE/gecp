'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
/*自动检测*/
// var borwserSync = require('browser-sync').create();
// var reload = borwserSync.reload;
// var watch = require('gulp-watch');
var path = {
    sass_isstudy:'./modules/istudy/sass/',
};
gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});

gulp.task('sass', function() {
    return gulp.src(path.sass_isstudy+'*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./modules/istudy/css'));
});

gulp.task('sass:watch', function() {
     gulp.watch(path.sass_isstudy+'*.scss', ['sass']);
     // gulp.watch('./modules/istudy/sass/*.scss').on('change',livereload);
});   //监控sass变化

// gulp.task('server', function() {
//     borwserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });

//     gulp.watch('modules/**/sass/*.scss', ['sass']);
//     gulp.watch("*.html").on('change', reload);
// });
// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
