var StringToBase64Transformer = (function () {
    function StringToBase64Transformer() {
    }
    Object.defineProperty(StringToBase64Transformer.prototype, "label", {
        get: function () {
            return 'String to Base64';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringToBase64Transformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    StringToBase64Transformer.prototype.check = function (input) {
        return true;
    };
    StringToBase64Transformer.prototype.transform = function (input) {
        var buffer = new Buffer(input);
        var output = buffer.toString('base64');
        return output;
    };
    return StringToBase64Transformer;
})();
exports.StringToBase64Transformer = StringToBase64Transformer;
var Base64ToStringTransformer = (function () {
    function Base64ToStringTransformer() {
    }
    Object.defineProperty(Base64ToStringTransformer.prototype, "label", {
        get: function () {
            return "Base64 to String";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base64ToStringTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    Base64ToStringTransformer.prototype.check = function (input) {
        return true;
    };
    Base64ToStringTransformer.prototype.transform = function (input) {
        var buffer = new Buffer(input, 'base64');
        var output = buffer.toString('utf8');
        return output;
    };
    return Base64ToStringTransformer;
})();
exports.Base64ToStringTransformer = Base64ToStringTransformer;
//# sourceMappingURL=base64.js.map