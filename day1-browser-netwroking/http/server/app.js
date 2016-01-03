var options = {
    port: 8080
};

var http = require('http');
var Server = require('./server');

var server = http.createServer(onClientConnected);

server.listen(options.port, onServerStart);

function onClientConnected(request, response) {
    new Server(request, response);
}

function onServerStart() {
    console.log('server started on port ' + options.port);
}

