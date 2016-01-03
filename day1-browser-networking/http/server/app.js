var options = {
    port: 8080
};

var http = require('http');
var Client = require('./client');

var server = http.createServer(onClientConnected);

server.listen(options.port, onServerStart);

function onClientConnected(request, response) {
    var client = new Client(request, response);
    client.startListeners();
}

function onServerStart() {
    console.log('server started on port ' + options.port);
}

