import gulp from 'gulp';
import handlebars from 'handlebars';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import compileHandlebars from 'gulp-handlebars-html'
import server from 'gulp-server-livereload';

var hbs = compileHandlebars(handlebars);

const PATHS = {
  src: './src',
  partialsDir: './src/partials',
  partials: './src/partials/**/*.hbs',
  templates: './src/**/*.html',
  styles: './src/styles/**/*.scss',
  build: './build'
};

gulp.task('default', ['watch', 'serve']);

gulp.task('compile', ['templates', 'styles']);

gulp.task('templates', () => {
  gulp.src(PATHS.templates)
    .pipe(hbs({}, {
      partialsDirectory: [PATHS.partialsDir]
    }))
    .pipe(gulp.dest(PATHS.build))
});

gulp.task('templates:watch', () => {
  gulp.watch(PATHS.templates, ['templates']);
  gulp.watch(PATHS.partials, ['templates']);
});

gulp.task('styles', () => {
  gulp.src(PATHS.styles)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('styles:watch', () => {
  gulp.watch(PATHS.styles, ['styles']);
});

gulp.task('watch', ['styles:watch', 'templates:watch']);

gulp.task('serve', () => {
  gulp.src(PATHS.build)
    .pipe(server({
      livereload: true,
      open: true
    }));
})
