module.exports = config => {
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("src/client.js");

    return {
        port: 8080,
        dir: {
            input: "src",
            output: "build",
            data: "_data",
        },
    }
};
