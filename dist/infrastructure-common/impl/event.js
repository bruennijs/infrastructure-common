var rx = require("rx");
var DomainEventBusImpl = (function () {
    function DomainEventBusImpl() {
        this.map = {};
    }
    DomainEventBusImpl.prototype.publish = function (event) {
        var observables = this.map[event.context];
        if (observables !== undefined) {
            observables.forEach(function (observable, n, array) {
                observable.onNext(event);
            });
        }
    };
    DomainEventBusImpl.prototype.subscribe = function (contextName) {
        if (contextName === undefined) {
            throw new Error("groupName undefined");
        }
        var subject = new rx.ReplaySubject();
        var observableList = this.map[contextName];
        if (observableList !== undefined) {
            observableList.push(subject);
        }
        else {
            this.map[contextName] = [subject];
        }
        return subject;
    };
    return DomainEventBusImpl;
})();
exports.DomainEventBusImpl = DomainEventBusImpl;
//# sourceMappingURL=event.js.map