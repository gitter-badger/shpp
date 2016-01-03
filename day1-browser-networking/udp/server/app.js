var options = {
    port: 8080
};

var dgram = require('dgram');
var Server = require('./server');

var server = new Server(dgram.createSocket('udp4'), options);
server.startListeners();