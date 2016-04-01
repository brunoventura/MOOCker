const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const connect = require( 'gulp-connect' );

const path = {
    files: './static/**/*',
    entryFile: './static/lib/app.js',
    build: './build/',
    buildFile: 'bundle.js'
}

gulp.task('transpile', () => {
    return browserify(path.entryFile)
        .transform(babelify, {
            presets: ["es2015", "react"],
            plugins: ['babel-plugin-transform-decorators-legacy']
        })
        .bundle()
        .on('error', function(err) {
            console.error(err.stack);
            this.emit('end');
        })
        .pipe(source(path.buildFile))
        .pipe(gulp.dest(`${path.build}lib/`));
});

gulp.task('copyFiles', () => {
    gulp.src([path.files, '!./static/lib/**/*'])
        .pipe(gulp.dest(path.build));
});

gulp.task('watch', () => {
    gulp.watch( path.files, [ 'files' ]);
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

gulp.task( 'serve', ['connect', 'watch']);
