import fs from 'fs';
import { spawn } from 'child_process';
import _ from 'lodash';
import gulp from 'gulp';
import glob from 'glob';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import gzip from 'gulp-gzip';
import rename from 'gulp-rename';
import s3 from 'gulp-s3';
import webpack from 'gulp-webpack';
import handlebars from 'gulp-compile-handlebars'
import inlineSource from 'gulp-inline-source'
import server from 'gulp-server-livereload';
import handlebarsHelpers from './lib/handlebars_helpers';
import loadTemplateData from './lib/load_template_data';
import { getRepos } from './lib/github';

const PATHS = {
  src: './src',
  partialsDir: './src/partials',
  partials: './src/partials/**/*.hbs',
  templates: './src/**/*.html',
  images: './src/**/*.ico',
  data: './data/*',
  styles: './src/styles/**/*.scss',
  scripts: './src/scripts/main.js',
  build: './build',
  lib: './lib/*',
};

const webpackConfig = {
  output: { filename: '[name].js' },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=2' }
    ]
  }
};

var repoData = [];
try {
  repoData = JSON.parse(fs.readFileSync('/tmp/repos.json').toString());
} catch(e) {
  console.log('No repo cache found.');
}

gulp.task('default', ['repos', 'build', 'watch']);

gulp.task('build', ['templates', 'images', 'styles', 'scripts']);

gulp.task('watch', ['styles:watch', 'templates:watch', 'scripts:watch', 'serve'], () => {
  gulp.watch('gulpfile.babel.js', ['gulp-reload']);
});

gulp.task('templates', () => {
  var data = loadTemplateData(repoData);

  return gulp.src(PATHS.templates)
    .pipe(handlebars(data, {
      batch: glob.sync(PATHS.partialsDir),
      helpers: handlebarsHelpers
    }))
    .pipe(gulp.dest(PATHS.build))
});

gulp.task('templates:watch', () => {
  gulp.watch(PATHS.lib, ['templates']);
  gulp.watch(PATHS.templates, ['templates']);
  gulp.watch(PATHS.partials, ['templates']);
  gulp.watch(PATHS.data, ['templates']);
});

gulp.task('images', () => {
  return gulp.src(PATHS.images)
    .pipe(gulp.dest(PATHS.build))
});

gulp.task('styles', () => {
  return gulp.src(PATHS.styles)
    .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: [
          'node_modules',
          'node_modules/bootstrap-sass/assets/stylesheets'
        ]
      }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('scripts', () => {
  return gulp.src(PATHS.scripts)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(PATHS.build))
});

gulp.task('scripts:watch', () => {
  gulp.watch(PATHS.scripts, ['scripts']);
});

gulp.task('styles:watch', () => {
  gulp.watch(PATHS.styles, ['styles']);
});

gulp.task('repos', (done) => {
  getRepos((data) => {
    repoData = data;
    done();
  });
});

gulp.task('minify', ['minify:html', 'minify:css', 'minify:js']);

gulp.task('inline', function () {
  return gulp.src('build/*.html')
      .pipe(inlineSource())
      .pipe(gulp.dest('./build'));
});

gulp.task('minify:html', ['inline'], () => {
  return gulp.src('build/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('minify:css', () => {
  return gulp.src('build/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('minify:js', () => {
  return gulp.src(PATHS.scripts)
    .pipe(webpack({
      ...webpackConfig,
      plugins: [
        new webpack.webpack.optimize.UglifyJsPlugin({ minimize: true })
      ]
    }))
    .pipe(gulp.dest(PATHS.build))
});

gulp.task('deploy', ['minify'], () => {
  var aws = {
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    region: 'us-east-1'
  };

  var options = {
    gzippedOnly: true,
    headers: {
      'Cache-Control': 'max-age=315360000, no-transform, public'
    }
  };

  return gulp.src('build/**')
    .pipe(gzip())
    .pipe(s3(aws, options));
});

gulp.task('gulp-reload', function() {
  spawn('gulp', ['watch'], { stdio: 'inherit' });
  process.exit();
});

gulp.task('serve', () => {
  return gulp.src(PATHS.build)
    .pipe(server({
      livereload: true,
      open: true
    }));
})
