var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');

gulp.task('styles', function() {
    return gulp.src('app/css/*.css')
                .pipe(concat('all.css'))
                .pipe(myth())
                .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
    return gulp.src('app/js/*js')
                .pipe(concat('all.js'))
                .pipe(uglify())
                .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    gulp.watch('css/*.css','styles');
    gulp.wtach('js/*.js','scripts');
});
// gulp.task('default',gulp.parallel('styles','scripts','watch'));
