var Route = (function () {

    var route = {};

    var html5mode = false;

    var callbacks = [];

    window.addEventListener("hashchange", onHashChange);

    route.path = function (value) {

        function getPath() {
            return window.location.hash.slice(1);
        }

        function setPath() {
            window.location.hash = value;
        }

        if (!value) {
            return getPath();
        } else {
            setPath();
        }
    };

    route.addPathChangeListener = function (callback) {
        var args = [].splice.call(arguments, 0);
        callbacks.push({
            callback: callback,
            args: args
        });
    };

    route.removePathChangeListener = function (callback) {
        callbacks = callbacks.filter(function (item) {
            return item.callback !== callback;
        });
    };

    function onHashChange() {
        callbacks.forEach(function (item) {
            item.callback.apply(window, item.args);
        });
    }

    return route;

})();