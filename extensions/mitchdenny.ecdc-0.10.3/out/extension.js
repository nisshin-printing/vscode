var urlEncode = require('./lib/urlEncode');
var crockford32 = require('./lib/crockford32');
var htmlentities = require('./lib/htmlentities');
var base64 = require('./lib/base64');
var md5 = require('./lib/md5');
var jsonarray = require('./lib/jsonarray');
var telemetry = require('./lib/telemetry');
var vscode = require('vscode');
var util = require('util');
var Context = (function () {
    function Context() {
        this.failedChanges = [];
    }
    return Context;
})();
var Change = (function () {
    function Change(textEditor, originalSelection, transformer, originalOffset) {
        this.textEditor = textEditor;
        this.originalSelection = originalSelection;
        this.transformer = transformer;
        this.originalOffset = originalOffset;
    }
    Change.prototype.transformText = function (context, edit) {
        var originalSelectionStartOffset = this.textEditor.document.offsetAt(this.originalSelection.start);
        var originalSelectionEndOffset = this.textEditor.document.offsetAt(this.originalSelection.end);
        var originalSelectionLength = originalSelectionEndOffset - originalSelectionStartOffset;
        this.updatedSelectionStartOffset = originalSelectionStartOffset + this.originalOffset;
        var range = new vscode.Range(this.originalSelection.start, this.originalSelection.end);
        this.input = this.textEditor.document.getText(range);
        if (this.transformer.check(this.input) == true) {
            this.output = this.transformer.transform(this.input);
        }
        else {
            this.output = this.input;
            context.failedChanges.push(this);
        }
        edit.replace(range, this.output);
        this.inputOutputLengthDelta = this.output.length - this.input.length;
        this.updatedOffset = this.originalOffset + this.inputOutputLengthDelta;
    };
    Change.prototype.updateSelection = function () {
        var updatedSelectionStart = this.textEditor.document.positionAt(this.updatedSelectionStartOffset);
        var updatedSelectionEnd = this.textEditor.document.positionAt(this.updatedSelectionStartOffset + this.output.length);
        // Build and store the new selection.
        this.updatedSelection = new vscode.Selection(updatedSelectionStart, updatedSelectionEnd);
    };
    return Change;
})();
function processSelections(textEditor, edit, transformer) {
    var document = textEditor.document;
    var changes = [];
    var updatedSelections = [];
    var context = new Context();
    textEditor.edit(function (editBuilder) {
        for (var selectionIndex = 0; selectionIndex < textEditor.selections.length; selectionIndex++) {
            var selection = textEditor.selections[selectionIndex];
            var offset = 0;
            if (selectionIndex != 0) {
                var previousChange = changes[selectionIndex - 1];
                offset = previousChange.updatedOffset;
            }
            var change = new Change(textEditor, selection, transformer, offset);
            changes[selectionIndex] = change;
            change.transformText(context, editBuilder);
        }
    }).then(function () {
        for (var changeIndex = 0; changeIndex < changes.length; changeIndex++) {
            var change = changes[changeIndex];
            change.updateSelection();
            updatedSelections.push(change.updatedSelection);
        }
        textEditor.selections = updatedSelections;
    }).then(function () {
        if (context.failedChanges.length != 0) {
            var message = util.format('%s selections could not be processed.', context.failedChanges.length);
            vscode.window.showWarningMessage(message);
        }
    });
}
function selectAndApplyTransformation(textEditor, edit) {
    var transformers = [
        new base64.StringToBase64Transformer(),
        new base64.Base64ToStringTransformer(),
        new jsonarray.StringToJsonArrayTransformer(),
        new jsonarray.Base64ToJsonArrayTransformer(),
        new md5.StringToMD5Transformer(),
        new htmlentities.StringToHtmlEntitiesTransformer(),
        new htmlentities.HtmlEntitiesToStringTransformer(),
        new crockford32.IntegerToCrockfordBase32Transformer(),
        new crockford32.CrockfordBase32ToIntegerTransformer(),
        new urlEncode.StringToEncodedUrlTransformer(),
        new urlEncode.EncodedUrlToStringTransformer()
    ];
    vscode.window.showQuickPick(transformers).then(function (transformer) {
        telemetry.trackEvent(transformer.constructor.name, {
            nodeVersion: process.version,
            platform: process.platform,
            architecture: process.arch,
            vscodeVersion: vscode.version
        }, {
            selections: textEditor.selections.length
        });
        processSelections(textEditor, edit, transformer);
    });
}
function registerConvertSelectionCommand(context) {
    var convertSelectionDisposable = vscode.commands.registerTextEditorCommand('extension.convertSelection', function (textEditor, edit) {
        selectAndApplyTransformation(textEditor, edit);
    });
    context.subscriptions.push(convertSelectionDisposable);
}
function activate(context) {
    registerConvertSelectionCommand(context);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map