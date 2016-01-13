var Event = (function () {

    var self = this;

    self.events = [];
    self.commands = [];

    var event = {};

    event.command = {};

    event.command.on = function (name, callback) {
        if (typeof name !== 'string' || typeof callback !== 'function') {
            throw Error('Name should be a string and callback should be a function');
        }

        self.commands[name] = callback;
    };

    event.command.execute = function (name) {
        var args = [].splice.call(arguments, 0);
        if (name && self.commands[name]) {
            self.commands[name].apply(window, args.slice(1, arguments.length));
        }
    };

    event.command.remove = function (name) {
        if (typeof name !== 'string') {
            throw Error('Name should be a string');
        }
        delete event.commands[name];
    };

    event.on = function (name, callback) {

        if (typeof name !== 'string' || typeof callback !== 'function') {
            throw Error('Name should be a string and callback should be a function');
        }

        self.events.push({
            name: name,
            callback: callback
        });
    };

    event.emit = function (name) {
        if (typeof name !== 'string') {
            throw Error('Name should be a string');
        }
        var args = [].splice.call(arguments, 0);

        self.events.forEach(function (item) {
            if (item.name === name) {
                item.callback.apply(window, args.slice(1, arguments.length));
            }
        });

    };

    event.remove = function (name, callback) {
        if (typeof name !== 'string') {
            throw Error('Name should be a string');
        }

        self.events.forEach(function (item, key) {
            if (item.name === name) {
                if (!callback || (callback && item.callback === callback)) {
                    self.events.splice(key, 1);
                }
            }
        });

    };

    return event;

})();