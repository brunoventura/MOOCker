'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const connect = require('gulp-connect');
const ghPages = require('gulp-gh-pages');
const eslint = require('gulp-eslint');

const path = {
    files: './static/**/*',
    entryFile: './static/lib/app.js',
    build: './build/',
    buildFile: 'bundle.js'
};

gulp.task('eslint', () => {
    const pipe = gulp.src(['index.js', './lib/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    return pipe;
});

gulp.task('transpile', () => {
    const pipe = browserify(path.entryFile)
        .transform(babelify, {
            presets: ['es2015', 'react'],
            plugins: ['babel-plugin-transform-decorators-legacy']
        })
        .bundle()
        .on('error', () => {
            this.emit('end');
        })
        .pipe(source(path.buildFile))
        .pipe(gulp.dest(`${path.build}lib/`));
    return pipe;
});

gulp.task('copyFiles', () => {
    gulp.src([path.files, '!./static/lib/**/*'])
        .pipe(gulp.dest(path.build));
});

gulp.task('watch', () => {
    gulp.watch(path.files, ['files']);
});

gulp.task('files', ['copyFiles', 'transpile'], () => {
    gulp.src(path.files).pipe(connect.reload());
});

gulp.task('connect', () => {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('deploy', () => gulp.src(`${path.build}/**/*`).pipe(ghPages()));

gulp.task('serve', ['connect', 'watch']);
