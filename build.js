var metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var inPlace = require('metalsmith-in-place');
var sass = require('metalsmith-sass');

var BUILD_DIR = 'build';

metalsmith(__dirname)
  .use(layouts({
    engine: 'handlebars',
    default: 'default.html'
  }))
  .use(inPlace({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(sass({
    outputStyle: 'expanded',
    outputDir: 'assets',
    sourceMap: true,
    sourceMapContents: true
  }))
  .destination(BUILD_DIR)
  .build(function(err) {
    if (err) console.log(err);
  });
