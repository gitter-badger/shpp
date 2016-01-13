var Storage = (function () {

    var storageInstance = localStorage;

    var storage = {};

    storage.get = function (key) {
        return JSON.parse(storageInstance.getItem(key));
    };

    storage.set = function (key, value) {
        storageInstance.setItem(key, JSON.stringify(value));
    };

    return storage;

})();