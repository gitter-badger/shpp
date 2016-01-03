var Log = require('log');
var fs = require('fs');

function Logger(options) {
    return new Log('info', fs.createWriteStream(options.file, {flags: 'a'}));
}

module.exports = Logger;