var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var mqpacker = require("css-mqpacker");
var config = require('../config');


gulp.task('sass', function() {

    var processors = [
        autoprefixer({browsers: ['last 30 versions'], cascade: false}),
        mqpacker()
    ];

    return sass(config.src.sass+'*.sass', {
        sourcemap: true,
        style: 'compact',
        emitCompileError: true
    })
    .on('error', notify.onError({
        title: 'Sass Error!',
        message: '<%= error.message %>'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*', ['sass']);
});