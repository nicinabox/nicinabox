const util = require('util');
const sass = require("node-sass");
const renderSass = util.promisify(sass.render);
const inputFile = "src/styles/main.scss";
const outputFile = "main.css";

module.exports = class {
  data() {
    return {
      permalink: outputFile,
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    const result = await renderSass({
        includePaths: [
            'node_modules',
            'node_modules/bootstrap-sass/assets/stylesheets'
        ],
        file: inputFile,
    });

    return result.css;
  }
};
