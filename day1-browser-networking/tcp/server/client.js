var Log = require('../../logger')({
    file: __dirname + '/info.log'
});

function Server(client) {
    this.setClient(client);
    Log.info('New client ' + this.getClient().remoteAddress + ' connected');
}

Server.prototype.startListeners = function () {
    this.getClient().on('end', this.onClientEnd.bind(this));
    this.getClient().on('data', this.onServerReceiveData.bind(this));
};

Server.prototype.onServerReceiveData = function (data) {
    Log.info('Server received data: ' + data.toString() + ' from client ' + this.getClient().remoteAddress);
    this.getClient().write(data.toString());
    this.endConnectionWithClient();
};

Server.prototype.onClientEnd = function () {
    Log.info('client ' + this.getClient().remoteAddress + ' disconnected');
};

Server.prototype.getClient = function () {
    return this.client;
};

Server.prototype.setClient = function (client) {
    this.client = client;
};

Server.prototype.endConnectionWithClient = function () {
    this.getClient().end();
};

module.exports = Server;