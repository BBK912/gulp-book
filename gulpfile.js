var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var connect = require('connect');
var server = require('serve-static');
var browsersync = require('browser-sync');
var del = require('del');

gulp.task('browsersync', function(cb) {
    return browsersync({
        server:{
            baseDir:'./'
        }
    },cb);
});

gulp.task('clean',function(cb) {
    del(['dist/*','!dist/all.css'],cb);
});

gulp.task('server', function() {
    return connect().use(server(__dirname))
        .listen(8080)
        .on('listening', function() {
            console.log('Server Running: View at http://localhost:8080');
        })
});

gulp.task('styles', function() {
    return gulp.src('app/css/*.css')
                .pipe(concat('all.css'))
                .pipe(myth())
                .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin',function() {
    return gulp.src('app/img/*')
                .pipe(imagemin())
                .pipe(gulp.dest('dist/img/'));
});

gulp.task('scripts', function () {
    return gulp.src('app/js/*.js')
                .pipe(concat('all.js'))
                .pipe(uglify())
                .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['clean','styles','scripts','imagemin'],function(){
    gulp.watch('app/css/*.css',['styles',browsersync.reload]);
    gulp.watch('app/js/*.js',['scripts',browsersync.reload]);
    gulp.watch('app/img/*',['imagemin',browsersync.reload]);
});

gulp.task('default',['clean','styles','scripts','browsersync','watch'])
