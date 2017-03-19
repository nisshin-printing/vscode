"use strict";
var vscode_1 = require('vscode');
var Shortcuts = (function () {
    function Shortcuts(config) {
        var btns = config.buttons;
        if (btns) {
            this.buttons = btns.map(function (btnTx) {
                var _a = btnTx.split(',').map(function (tx) { return tx.trim(); }), icon = _a[0], cmd = _a[1], tip = _a[2];
                var btn = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
                btn.text = "$(" + icon + ")";
                btn.command = cmd;
                btn.tooltip = tip;
                return btn;
            });
        }
    }
    Shortcuts.prototype.show = function () {
        this.buttons.forEach(function (btn) {
            btn.show();
        });
    };
    Shortcuts.prototype.dispose = function () {
        this.buttons.forEach(function (btn) {
            btn.dispose();
        });
    };
    return Shortcuts;
}());
exports.Shortcuts = Shortcuts;
//# sourceMappingURL=shortcuts.js.map