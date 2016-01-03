var Log = require('../../logger')({
    file: __dirname + '/log'
});

function Server(client, options) {
    this.setClient(client);

    this.getClient().on('message', this.onDataReceive.bind(this));

    this.getClient().bind(options.port);
}

Server.prototype.setClient = function (client) {
    this.client = client;
};

Server.prototype.getClient = function () {
    return this.client;
};

Server.prototype.onDataReceive = function (msg, client) {
    Log.info('Received message from the client ' + client.address + ': ' + msg);

    this.respondToClient(msg, client);
};

Server.prototype.prepareMessage = function (msg) {
    return new Buffer(msg);
};

Server.prototype.respondToClient = function (msg, client) {

    Log.info('Send message to the client ' + client.address + ': ' + msg);

    this.getClient().send(
        this.prepareMessage(msg),
        0,
        msg.length,
        client.port,
        client.address
    );
};

module.exports = Server;