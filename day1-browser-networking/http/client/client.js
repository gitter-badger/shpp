var Log = require('../../logger')({
    file: __dirname + '/info.log'
});

function Client(request) {
    this.request = request;
    this.receivedData = '';
}

Client.prototype.startListeningServer = function () {
    this.request.on('response', this.onServerRespond.bind(this));
};

Client.prototype.close = function () {
    this.request.end();
};

Client.prototype.onServerRespond = function (response) {
    Log.info('Server responded. Starting to read message');
    response.on('data', this.readingResponseFromServer.bind(this));
    response.on('end', this.onDataReceived.bind(this));
};

Client.prototype.writeSomethingToServer = function () {

    var msg = 'Ping';

    Log.info('Send message to server: ' + msg);

    this.request.write(msg)
};

Client.prototype.readingResponseFromServer = function (chunk) {
    Log.info('Reading message');
    this.receivedData += chunk;
};

Client.prototype.onDataReceived = function () {
    Log.info('Received message from the server : ' + this.receivedData);
    this.printReceivedData();
};

Client.prototype.printReceivedData = function () {
    console.log('Received data from the server: ' + this.receivedData);
};

module.exports = Client;