module.exports = config => {
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("src/client.js");

    config.addWatchTarget("./src/*.js");
    config.addWatchTarget("./src/styles/*.scss");
    config.addWatchTarget("./src/_data/*.json");

    return {
        port: 8080,
        dir: {
            input: "src",
            output: "build",
            data: "_data",
        },
    }
};
