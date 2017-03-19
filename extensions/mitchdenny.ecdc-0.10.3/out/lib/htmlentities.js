var ent = require('ent');
var HtmlEntitiesToStringTransformer = (function () {
    function HtmlEntitiesToStringTransformer() {
    }
    Object.defineProperty(HtmlEntitiesToStringTransformer.prototype, "label", {
        get: function () {
            return 'HTML Entities to String';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlEntitiesToStringTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    HtmlEntitiesToStringTransformer.prototype.check = function (input) {
        return true;
    };
    HtmlEntitiesToStringTransformer.prototype.transform = function (input) {
        var output = ent.decode(input);
        return output;
    };
    return HtmlEntitiesToStringTransformer;
})();
exports.HtmlEntitiesToStringTransformer = HtmlEntitiesToStringTransformer;
var StringToHtmlEntitiesTransformer = (function () {
    function StringToHtmlEntitiesTransformer() {
    }
    Object.defineProperty(StringToHtmlEntitiesTransformer.prototype, "label", {
        get: function () {
            return 'String to HTML Entities';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringToHtmlEntitiesTransformer.prototype, "description", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    StringToHtmlEntitiesTransformer.prototype.check = function (input) {
        return true;
    };
    StringToHtmlEntitiesTransformer.prototype.transform = function (input) {
        var output = ent.encode(input, { named: true });
        return output;
    };
    return StringToHtmlEntitiesTransformer;
})();
exports.StringToHtmlEntitiesTransformer = StringToHtmlEntitiesTransformer;
//# sourceMappingURL=htmlentities.js.map