var enc = require('encode32');
var CrockfordBase32ToIntegerTransformer = (function () {
    function CrockfordBase32ToIntegerTransformer() {
    }
    Object.defineProperty(CrockfordBase32ToIntegerTransformer.prototype, "label", {
        get: function () {
            return 'Crockford Base32 to Integer';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrockfordBase32ToIntegerTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    CrockfordBase32ToIntegerTransformer.prototype.check = function (input) {
        return true;
    };
    CrockfordBase32ToIntegerTransformer.prototype.transform = function (input) {
        var result = enc.decode32(input);
        return String(result);
    };
    return CrockfordBase32ToIntegerTransformer;
})();
exports.CrockfordBase32ToIntegerTransformer = CrockfordBase32ToIntegerTransformer;
var IntegerToCrockfordBase32Transformer = (function () {
    function IntegerToCrockfordBase32Transformer() {
    }
    Object.defineProperty(IntegerToCrockfordBase32Transformer.prototype, "label", {
        get: function () {
            return 'Integer to Crockford Base32';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntegerToCrockfordBase32Transformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    IntegerToCrockfordBase32Transformer.prototype.check = function (input) {
        return true;
    };
    IntegerToCrockfordBase32Transformer.prototype.transform = function (input) {
        var inputAsInteger = Number.parseInt(input);
        return enc.encode32(inputAsInteger);
    };
    return IntegerToCrockfordBase32Transformer;
})();
exports.IntegerToCrockfordBase32Transformer = IntegerToCrockfordBase32Transformer;
//# sourceMappingURL=crockford32.js.map