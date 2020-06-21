module.exports = config => {
    return {
        port: 8080,
        dir: {
          input: "src",
          output: "build",
          data: "_data",
        },
    }
};
