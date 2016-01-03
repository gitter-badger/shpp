var options = {
    port: '8080',
    host: 'localhost',
    path: '/',
    method: 'POST'
};

var dgram = require('dgram');
var Client = require('./client');

var client = new Client(dgram.createSocket('udp4'), options);
client.startToListenMessageFromServer();
client.sayHello();