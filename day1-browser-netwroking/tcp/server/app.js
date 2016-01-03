var options = {
    port: 8080
};

var net = require('net');
var Server = require('./server');

var server = net.createServer(onClientConnected);

server.listen(options.port, onServerStart);

function onServerStart() {
    console.log('server started and listening ' + options.port + ' port');
}

function onClientConnected(client) {
    new Server(client);
}