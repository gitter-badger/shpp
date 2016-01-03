var options = {
    serverPort: 8080,
    serverIp: '127.0.0.1'
};

var net = require('net');
var Client = require('./client');

var connect = net.connect({
   port: options.serverPort
}, onConnectionSuccess);

function onConnectionSuccess() {
    var client = new Client(connect);
    client.startListeners();
    client.sayHelloToServer();
}