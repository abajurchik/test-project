var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var svgSprite = require('gulp-svgsprite');
var rename = require('gulp-rename');

gulp.task('server', ['styles','pug'], function() {
    browserSync.init({
    	server: { baseDir: './app/'}
    });
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/pug/*.pug', ['pug']);
    gulp.watch('./app/less/**/*.less', ['styles']);
});

gulp.task('styles', function() {
    return gulp.src('./app/less/*.less')
    .pipe(plumber({
    	errorHandler: notify.onError(function(err){
    		return {
    			title: 'Styles',
    			message: err.message
    		}
    	})
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
    	browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src('./src/pug/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Pug',
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('svg', function() {
    return gulp.src('./app/img/svg-sprite/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('./app/img'));
});


gulp.task('default', ['styles','pug','svg','server']);