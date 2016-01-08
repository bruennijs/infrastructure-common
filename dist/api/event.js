var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DomainEventBase = (function () {
    function DomainEventBase(context, name) {
        this._context = "";
        this._context = context;
        this._name = name;
    }
    Object.defineProperty(DomainEventBase.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomainEventBase.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    return DomainEventBase;
})();
exports.DomainEventBase = DomainEventBase;
var AggregateEvent = (function (_super) {
    __extends(AggregateEvent, _super);
    function AggregateEvent(context, name, id, version) {
        _super.call(this, context, name);
        this._version = version;
        this._id = id;
    }
    Object.defineProperty(AggregateEvent.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AggregateEvent.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    return AggregateEvent;
})(DomainEventBase);
exports.AggregateEvent = AggregateEvent;
//# sourceMappingURL=event.js.map