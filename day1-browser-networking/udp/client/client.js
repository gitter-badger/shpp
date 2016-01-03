var Log = require('../../logger')({
    file: __dirname + '/info.log'
});

function Client(client, options) {
    this.setClient(client);
    this.options = options;
}

Client.prototype.startToListenMessageFromServer = function () {
    this.getClient().on('message', this.onDataReceived.bind(this));
};

Client.prototype.onDataReceived = function (msg) {
    Log.info('Received message from the server: ' + msg.toString());
    this.closeConnection();
};

Client.prototype.sayHello = function () {
    var msg = 'Hello world!!';
    Log.info('Send message `' + msg + '` to the server');
    this.getClient().send(
        this.prepareMessage(msg),
        0,
        msg.length,
        this.options.port,
        this.options.host
    );
};

Client.prototype.prepareMessage = function (msg) {
    return new Buffer(msg);
};

Client.prototype.setClient = function (client) {
    this.client = client;
};

Client.prototype.getClient = function () {
    return this.client;
};

Client.prototype.closeConnection = function () {
    this.getClient().close();
};

module.exports = Client;