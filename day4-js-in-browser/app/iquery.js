Element.prototype.find = function (value) {
    return this.querySelector(value);
};

Element.prototype.findAll = function (value) {
    return this.querySelectorAll(value);
};

Element.prototype.show = function () {
    this.style.display = '';
};

Element.prototype.hide = function () {
    this.style.display = 'none';
};

Element.prototype.html = function (value) {

    var self = this;

    function getHtml() {
        return self.innerHTML;
    }

    function setHtml() {
        self.innerHTML = value;
        return self;
    }

    if (value === undefined) {
        return getHtml();
    } else {
        setHtml();
        return this;
    }
};

Element.prototype.appendNode = function (node) {
    this.appendChild(node);
};

Element.prototype.on = function (type, callback) {
    var self = this;
    if (typeof arguments[1] === 'string' && typeof arguments[2] === 'function') {
        var selector = arguments[1];
        var callback = arguments[2];
        this.addEventListener(type, function (event) {
            var els = self.findAll(selector);
            for (var i in els) {
                if (els.hasOwnProperty(i)) {
                    var el = els[i];
                    if (el === event.target) {
                        callback.call(el, event, el);
                    }
                }
            }

        });
    } else {
        this.addEventListener(type, callback);
    }
};

Element.prototype.off = function (type, callback) {
    this.removeEventListener(type, callback);
};

Element.prototype.val = function (value) {

    var self = this;

    function getValue() {
        return self.value;
    }

    function setValue() {
        self.value = value;
        return self;
    }

    if (value === undefined) {
        return getValue();
    } else {
        setValue();
    }
};

(function () {

    window._ = function (value) {
        if (value instanceof Element) {
            return value;
        } else if (value instanceof HTMLCollection) {
            return value;
        } else if (typeof value === 'string' && value.length) {
            return document.querySelector(value);
        } else {
            return document;
        }
    };

    window._.each = function (items, iterator) {
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                iterator.call(window, items[key]);
            }
        }
    };

})();