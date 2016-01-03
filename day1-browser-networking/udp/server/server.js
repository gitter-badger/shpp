var Log = require('../../logger')({
    file: __dirname + '/info.log'
});

function Server(socket, options) {
    this.setSocket(socket);
    this.options = options;
}

Server.prototype.startListeners = function () {
    this.getSocket().on('message', this.onDataReceive.bind(this));
    this.getSocket().bind(this.options.port);
};

Server.prototype.setSocket = function (socket) {
    this.socket = socket;
};

Server.prototype.getSocket = function () {
    return this.socket;
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

    this.getSocket().send(
        this.prepareMessage(msg),
        0,
        msg.length,
        client.port,
        client.address
    );
};

module.exports = Server;