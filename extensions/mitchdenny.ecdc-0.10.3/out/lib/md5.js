var crypto = require('crypto');
var StringToMD5Transformer = (function () {
    function StringToMD5Transformer() {
    }
    Object.defineProperty(StringToMD5Transformer.prototype, "label", {
        get: function () {
            return 'String to MD5 Hash (Base64 Encoded)';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringToMD5Transformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    StringToMD5Transformer.prototype.check = function (input) {
        return true;
    };
    StringToMD5Transformer.prototype.transform = function (input) {
        var hash = crypto.createHash('md5');
        hash.update(input, 'utf8');
        var output = hash.digest('base64');
        return output;
    };
    return StringToMD5Transformer;
})();
exports.StringToMD5Transformer = StringToMD5Transformer;
//# sourceMappingURL=md5.js.map