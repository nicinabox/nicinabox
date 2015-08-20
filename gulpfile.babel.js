import fs from 'fs';
import { argv } from 'yargs';
import gulp from 'gulp';
import glob from 'glob';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import gzip from 'gulp-gzip';
import rename from 'gulp-rename';
import watch from 'gulp-watch';
import rimraf from 'gulp-rimraf';
import s3 from 'gulp-s3';
import webpack from 'webpack-stream';
import handlebars from 'gulp-compile-handlebars'
import inlineSource from 'gulp-inline-source'
import server from 'gulp-server-livereload';
import handlebarsHelpers from './lib/handlebars_helpers';
import loadTemplateData from './lib/load_template_data';
import { getRepos } from './lib/github';

const {
  S3_KEY,
  S3_SECRET,
  S3_BUCKET,
} = process.env

const PATHS = {
  partialsDir: './src/partials',
  partials: './src/partials/**/*.hbs',
  templates: './src/**/*.html.hbs',
  images: './src/**/*.ico',
  data: './data.js',
  styles: './src/styles/**/*.scss',
  scripts: './src/scripts/main.js',
  buildDir: './build',
  build: './build/**',
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
  repoData = JSON.parse(fs.readFileSync('repos.json').toString());
} catch(e) {
  console.log('No repo cache found.');
}

gulp.task('default', ['repos', 'build', 'watch']);

// Build
gulp.task('build', (done) => {
  runSequence('clean', ['templates', 'images', 'styles', 'scripts'], done);
});

gulp.task('templates', () => {
  var data = loadTemplateData(repoData);

  return gulp.src(PATHS.templates)
    .pipe(handlebars(data, {
      batch: glob.sync(PATHS.partialsDir),
      helpers: handlebarsHelpers
    }))
    .pipe(rename((path) => {
      path.extname = ''
    }))
    .pipe(gulp.dest(PATHS.buildDir))
});

gulp.task('images', () => {
  return gulp.src(PATHS.images)
    .pipe(gulp.dest(PATHS.buildDir))
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
    .pipe(gulp.dest(PATHS.buildDir));
});

gulp.task('scripts', () => {
  return gulp.src(PATHS.scripts)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(PATHS.buildDir))
});

// Watch
gulp.task('watch', ['watch:templates', 'watch:styles', 'watch:scripts', 'serve']);

gulp.task('watch:templates', (done) => {
  watch([
    PATHS.templates,
    PATHS.lib,
    PATHS.partials,
    PATHS.data,
  ], () => {
    gulp.start('templates', done);
  });
});

gulp.task('watch:scripts', (done) => {
  watch(PATHS.scripts, () => {
    gulp.start('scripts', done);
  });
});

gulp.task('watch:styles', (done) => {
  watch(PATHS.styles, () => {
    gulp.start('styles', done);
  });
});

// Minify
gulp.task('minify', ['minify:html', 'minify:css', 'minify:js']);

gulp.task('inline', ['minify:js', 'minify:css'], function () {
  return gulp.src('build/*.html')
      .pipe(inlineSource())
      .pipe(gulp.dest('./build'));
});

gulp.task('minify:html', ['inline'], () => {
  return gulp.src('build/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(PATHS.buildDir));
});

gulp.task('minify:css', () => {
  return gulp.src('build/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(PATHS.buildDir));
});

gulp.task('minify:js', () => {
  return gulp.src(PATHS.scripts)
    .pipe(webpack({
      ...webpackConfig,
      plugins: [
        new webpack.webpack.optimize.UglifyJsPlugin({ minimize: true })
      ]
    }))
    .pipe(gulp.dest(PATHS.buildDir))
});

// Deploy
gulp.task('deploy', ['minify'], () => {
  var aws = {
    key: S3_KEY,
    secret: S3_SECRET,
    bucket: S3_BUCKET,
    region: 'us-east-1'
  };

  var options = {
    gzippedOnly: true,
    headers: {
      'Cache-Control': 'max-age=315360000, no-transform, public'
    }
  };

  return gulp.src(PATHS.build)
    .pipe(gzip())
    .pipe(s3(aws, options));
});

// Development
gulp.task('repos', (done) => {
  getRepos((data) => {
    repoData = data;
    done();
  });
});

gulp.task('clean', () => {
  return gulp.src(PATHS.buildDir, { read: false })
    .pipe(rimraf())
});

gulp.task('serve', () => {
  return gulp.src(PATHS.buildDir)
    .pipe(server({
      livereload: true,
      open: argv.open
    }));
})
