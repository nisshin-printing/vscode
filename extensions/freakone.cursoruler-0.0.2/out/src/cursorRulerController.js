"use strict";
var vscode_1 = require('vscode');
var CursorRulerController = (function () {
    function CursorRulerController(cursorRuler) {
        this._cursorRuler = cursorRuler;
        // subscribe to selection change and editor activation events
        var subscriptions = [];
        vscode_1.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        vscode_1.workspace.onDidChangeConfiguration(this._onUpdateSettings, this, subscriptions);
        // update for current file
        this._onEvent();
        // create a combined disposable from both event subscriptions
        this._disposable = vscode_1.Disposable.from.apply(vscode_1.Disposable, subscriptions);
    }
    CursorRulerController.prototype.dispose = function () {
        this._disposable.dispose();
    };
    CursorRulerController.prototype._onUpdateSettings = function () {
        var config = vscode_1.workspace.getConfiguration('cursor-ruler');
        this._cursorRuler.updateStyling(config);
    };
    CursorRulerController.prototype._onEvent = function () {
        this._cursorRuler.updateRuler();
    };
    return CursorRulerController;
}());
exports.CursorRulerController = CursorRulerController;
//# sourceMappingURL=cursorRulerController.js.map