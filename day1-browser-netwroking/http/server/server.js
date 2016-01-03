var Log = require('../../logger')({
    file: __dirname + '/log'
});

function Server(request, response) {

    Log.info('Client connected, ip: ' + request.connection.remoteAddress);

    this.request = request;
    this.response = response;

    this.request.on('data', this.onDataReceive.bind(this));
    this.request.on('end', this.closeResponse.bind(this));
}

Server.prototype.onDataReceive = function (data) {
    Log.info('Received data from client: ' + data.toString());

    this.respondToClient(data);
    this.closeResponse();
};

Server.prototype.respondToClient = function (data) {
    if (data && data.toString) {
        Log.info('Send message to client: ' + data.toString());
        this.response.write(data.toString());
    } else {
        throw Error('Data should be a string');
    }
};

Server.prototype.closeResponse = function () {
    this.response.end();
};

module.exports = Server;