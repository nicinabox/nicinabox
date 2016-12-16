require('babel-register')
const cmd = require('./' + process.argv[2]).default
cmd()
