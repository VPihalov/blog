const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
// const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

gulp.task('scss', () => {
    return (
        gulp
            .src('dev/scss/**/*.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(
                autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                    cascade: true
                })
            )
            .pipe(cssnano())
            .pipe(gulp.dest('public/stylesheets'))
            // .pipe(browserSync.reload({ stream: true }))
    );
});

gulp.task('scripts', () =>
    gulp
        .src([
            'dev/js/auth.js'
        ])
        .pipe(concat('scripts.js'))  //объединяем скрипты массива в один скрипт с названием scripts.js
        .pipe(uglify())   //сжимаем
        .pipe(gulp.dest('public/javascripts'))  //выгружаем
)

// gulp.task('browser-sync', () => {
//     browserSync({
//         server: {
//             baseDir: 'dist'
//         },
//         notify: false
//     });
// });

gulp.task('default', gulp.series('scss', 'scripts'), () => {
    gulp.watch('dev/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('dev/js/**/*.js', gulp.series('scripts'))
    // gulp.watch('dist/*.html', browserSync.reload);
});
