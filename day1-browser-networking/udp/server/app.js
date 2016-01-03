var options = {
    port: 8080
};

var dgram = require('dgram');
var Server = require('./server');


new Server(dgram.createSocket('udp4'), options);

//server.on("error", function (err) {
//    console.log("server error:\n" + err.stack);
//    server.close();
//});
//server.on("message", function (msg, rinfo) {
//    console.log("server got: " + msg + " from " +
//        rinfo.address + ":" + rinfo.port);
//    server.send(new Buffer(msg), 0, msg.length, rinfo.port, rinfo.address);
//});
//server.on("listening", function () {
//    var address = server.address();
//    console.log("server listening " +
//        address.address + ":" + address.port);
//});
//server.bind(options.port);