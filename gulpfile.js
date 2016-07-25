'use strict';

/**
 *
 * The packages we are using
 * Not using gulp-load-plugins as it is nice to see whats here.
 *
 **/
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence'); // while gulp < 4.0
var config = require('./config.json');
var jsonfile = require('jsonfile')


gulp.task('default', ['build']);

/**
 *
 * Styles
 * - Compile
 * - Compress/Minify
 * - Catch errors (gulp-plumber)
 * - Autoprefixer
 *
 **/
gulp.task('sass', function() {
    return gulp.src(path.join(config.srcPath, 'sass/**/*.scss'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(plumber())
        .pipe(gulp.dest(path.join(config.outputPath, 'css')));
});

/**
 *
 * BrowserSync.io
 * - Watch CSS, JS & HTML for changes
 * - View project at: localhost:3000
 *
 **/
gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './' + config.outputPath
        }
    });
});

/**
 *
 * Json file
 *
 **/
gulp.task('json-file', function() {
    var file = 'src/datas/pokedex.json';
    return jsonfile.readFile(file, function(err, obj) {
        if(err){
            console.log(err);
        }
        console.log(obj.pokedex);
    });
});

/**
 * Clean
 * - dist directory
 *
 **/
gulp.task('clean', function() {
    return del([config.outputPath], {force: true})
        .then( function(paths) {
            gutil.log('Deleted files and folders:');
            for (var path in paths) {
                gutil.log(" > ", paths[path]);
            }
        });
});

/**
 * HTML
 * - copy index.html into dist directory
 **/
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(plumber())
        .pipe(gulp.dest(config.outputPath));
});

/**
 * DATAS
 * - copy datas into dist directory
 **/
gulp.task('datas', function() {
    return gulp.src('src/datas/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(config.outputPath+'/datas'));
});

/**
 *
 * Javascript
 * - Uglify
 *
 **/
gulp.task('scripts', function() {
    return gulp.src(path.join(config.srcPath, 'js/*.js'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.join(config.outputPath, 'js')))
});



/**
 *
 * Default task
 * - Clean dist directory
 * - Runs sass, browser-sync, scripts tasks
 * - Watchs for file changes for scripts and sass/css
 *
 **/
gulp.task('watch', ['build'], function () {
    gulp.watch(path.join(config.srcPath, 'sass/**/*.scss'), ['sass'])
        .on('change', function (event) {
            gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        });
    gulp.watch(path.join(config.srcPath, 'js/**/*.js'), ['scripts'])
        .on('change', function (event) {
            gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        });
    gulp.watch('*.html', ['html'])
        .on('change', function (event) {
            gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        });
    gulp.watch(path.join(config.srcPath, 'datas/**/*'), ['json-file'])
        .on('change', function (event) {
            gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        });

});

/**
 * Build assets
 */
gulp.task('build', function(cb) {
    runSequence(
        'clean',
        ['sass', 'scripts', 'html', 'datas', 'json-file'],
        cb
    )
});

/**
 * Run Local Server
 */
gulp.task('serve', ['watch'], function(cb) {
    runSequence(
        'browser-sync',
        cb
    )
});
