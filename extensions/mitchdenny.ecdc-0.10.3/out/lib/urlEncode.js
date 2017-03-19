var StringToEncodedUrlTransformer = (function () {
    function StringToEncodedUrlTransformer() {
    }
    Object.defineProperty(StringToEncodedUrlTransformer.prototype, "label", {
        get: function () {
            return 'String to Encoded Url';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringToEncodedUrlTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    StringToEncodedUrlTransformer.prototype.check = function (input) {
        return true;
    };
    StringToEncodedUrlTransformer.prototype.transform = function (input) {
        var output = encodeURIComponent(input);
        return output;
    };
    return StringToEncodedUrlTransformer;
})();
exports.StringToEncodedUrlTransformer = StringToEncodedUrlTransformer;
var EncodedUrlToStringTransformer = (function () {
    function EncodedUrlToStringTransformer() {
    }
    Object.defineProperty(EncodedUrlToStringTransformer.prototype, "label", {
        get: function () {
            return "Encoded Url to String";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncodedUrlToStringTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    EncodedUrlToStringTransformer.prototype.check = function (input) {
        return true;
    };
    EncodedUrlToStringTransformer.prototype.transform = function (input) {
        var output = decodeURIComponent(input);
        return output;
    };
    return EncodedUrlToStringTransformer;
})();
exports.EncodedUrlToStringTransformer = EncodedUrlToStringTransformer;
//# sourceMappingURL=urlEncode.js.map