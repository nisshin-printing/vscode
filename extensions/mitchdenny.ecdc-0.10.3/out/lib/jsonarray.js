var StringToJsonArrayTransformer = (function () {
    function StringToJsonArrayTransformer() {
    }
    Object.defineProperty(StringToJsonArrayTransformer.prototype, "label", {
        get: function () {
            return 'String as JSON Byte Array';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringToJsonArrayTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    StringToJsonArrayTransformer.prototype.check = function (input) {
        return true;
    };
    StringToJsonArrayTransformer.prototype.transform = function (input) {
        var buffer = new Buffer(input, 'utf8');
        var data = buffer.toJSON().data;
        var output = JSON.stringify(data);
        return output;
    };
    return StringToJsonArrayTransformer;
})();
exports.StringToJsonArrayTransformer = StringToJsonArrayTransformer;
var Base64ToJsonArrayTransformer = (function () {
    function Base64ToJsonArrayTransformer() {
    }
    Object.defineProperty(Base64ToJsonArrayTransformer.prototype, "label", {
        get: function () {
            return 'Base64 to JSON Byte Array';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base64ToJsonArrayTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    Base64ToJsonArrayTransformer.prototype.check = function (input) {
        return true;
    };
    Base64ToJsonArrayTransformer.prototype.transform = function (input) {
        var buffer = new Buffer(input, 'base64');
        var data = buffer.toJSON().data;
        var output = JSON.stringify(data);
        return output;
    };
    return Base64ToJsonArrayTransformer;
})();
exports.Base64ToJsonArrayTransformer = Base64ToJsonArrayTransformer;
//# sourceMappingURL=jsonarray.js.map