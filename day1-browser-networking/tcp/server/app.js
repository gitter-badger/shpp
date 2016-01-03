var options = {
    port: 8080
};

var net = require('net');
var Client = require('./client');

var server = net.createServer(onClientConnected);

server.listen(options.port, onServerStart);

function onServerStart() {
    console.log('server started and listening ' + options.port + ' port');
}

function onClientConnected(socket) {
    var client = new Client(socket);
    client.startListeners();
}