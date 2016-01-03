var Log = require('../../logger')({
    file: __dirname + '/info.log'
});

function Client(client) {
    this.setClient(client);
}

Client.prototype.startListeners = function () {
    this.getClient().on('data', this.onDataReceived.bind(this));
};

Client.prototype.onDataReceived = function (data) {
    Log.info('Received message from server: ' + data.toString());
    this.closeConnection();
};

Client.prototype.sayHelloToServer = function () {
    var msg = 'Hello!';
    Log.info('Send message `' + msg + '` to the server');
    this.getClient().write(msg);
};

Client.prototype.setClient = function (client) {
    this.client = client;
};

Client.prototype.getClient = function () {
    return this.client;
};

Client.prototype.closeConnection = function () {
    Log.info('Close connection');
    this.getClient().end();
};

module.exports = Client;