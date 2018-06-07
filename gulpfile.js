const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            // Customizing error title
            title: errTitle || "Error running Gulp",
            message: "Error: <%= error.message %>",
        })
    });
}

gulp.task('less', function () {
    return gulp.src('./less/index.less')
        .pipe(customPlumber('Error Running Less'))
        .pipe(less())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true,
        }))
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: '.'
        },
    })
});


gulp.task('watch', ['browserSync', 'less'], function () {
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);
});


gulp.task('default', ['watch'], function () {
    console.log('Good to Go!');
});