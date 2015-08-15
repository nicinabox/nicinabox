var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var PORT = 8008;
var app = connect();

app.use(serveStatic(__dirname + '/build'));

http.createServer(app).listen(PORT);
console.log('Server is running on port ' + PORT);
