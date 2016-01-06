var _ = require("underscore");
var DomainEventDtoParser = (function () {
    function DomainEventDtoParser() {
    }
    DomainEventDtoParser.prototype.serialize = function (dtoObject, event) {
        dtoObject.context = event.context;
        dtoObject.name = event.name;
        dtoObject.content = {};
    };
    DomainEventDtoParser.prototype.addContent = function (objectAddTo, content) {
        if (objectAddTo.content === undefined) {
            objectAddTo.content = {};
        }
        _.extend(objectAddTo.content, content);
    };
    return DomainEventDtoParser;
})();
exports.DomainEventDtoParser = DomainEventDtoParser;
;
//# sourceMappingURL=EventDtoParser.js.map