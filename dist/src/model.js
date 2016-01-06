var _ = require('underscore');
var Id = (function () {
    function Id(value) {
        this._value = value;
    }
    Object.defineProperty(Id.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Id.parse = function (value) {
        return new Id(value);
    };
    Id.prototype.toString = function () {
        return this._value;
    };
    return Id;
})();
exports.Id = Id;
var IdObject = (function () {
    function IdObject(id, version) {
        this._version = 0;
        this._id = id;
        this._version = version;
    }
    Object.defineProperty(IdObject.prototype, "version", {
        get: function () {
            return this._version;
        },
        set: function (value) {
            this._version = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdObject.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    IdObject.Parse = function (json) {
        var obj = JSON.parse(json);
        return null;
    };
    IdObject.prototype.load = function (obj) {
        _.extend(this, obj);
    };
    IdObject.prototype.loadFrom = function (json) {
        this.load(JSON.parse(json));
    };
    IdObject.prototype.toString = function () {
        return this._id.toString();
    };
    return IdObject;
})();
exports.IdObject = IdObject;
//# sourceMappingURL=model.js.map