"use strict";
var vscode_1 = require('vscode');
var CursorRuler = (function () {
    function CursorRuler() {
        this.styling = {
            borderColor: 'lightgrey',
            borderSpacing: "1px",
            borderStyle: 'none none none solid',
            borderWidth: '1px',
        };
        this.decorator = vscode_1.window.createTextEditorDecorationType(this.styling);
    }
    CursorRuler.prototype.updateStyling = function (config) {
        var _this = this;
        vscode_1.window.visibleTextEditors.forEach(function (editor) {
            editor.setDecorations(_this.decorator, []);
        });
        if (config && config.has('color') && config.has('width')) {
            this.styling.borderColor = config['color'];
            this.styling.borderSpacing = config['width'];
            this.styling.borderWidth = this.styling.borderSpacing;
            this.decorator = vscode_1.window.createTextEditorDecorationType(this.styling);
        }
    };
    CursorRuler.prototype.updateRuler = function () {
        var editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        if (editor.selection.isEmpty) {
            var decorations = [];
            for (var i = 0; i < editor.document.lineCount; i++) {
                if (editor.document.lineAt(i).text.length >= editor.selection.end.character) {
                    decorations.push(new vscode_1.Range(i, editor.selection.start.character, i, editor.selection.end.character));
                }
            }
            editor.setDecorations(this.decorator, decorations);
        }
        else {
            editor.setDecorations(this.decorator, []);
        }
    };
    CursorRuler.prototype.dispose = function () {
        this.decorator.dispose();
    };
    return CursorRuler;
}());
exports.CursorRuler = CursorRuler;
//# sourceMappingURL=cursorRuler.js.map