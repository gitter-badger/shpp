var options = {
    port: '8080',
    host: 'localhost',
    path: '/',
    method: 'POST'
};

var http = require('http');
var Client = require('./client');

var client = new Client(http.request(options));

client.startListeningServer();
client.writeSomethingToServer();
client.close();
