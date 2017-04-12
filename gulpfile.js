var gulp = require('gulp'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
 
gulp.task('less', function () {
    return gulp.src('src/less/main.less')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});
gulp.task('scss', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});
gulp.task('es6', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('es6-build', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/'));
});

// gulp.task('dev', function() {
//     gulp.watch('src/less/*.less', ['less']);
//     gulp.watch('src/js/*.js', ['es6']);
// });

gulp.task('serve', ['less', 'es6', 'scss'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*.js', ['es6']).on('change',reload);
    gulp.watch("index.html").on('change', reload);
});
