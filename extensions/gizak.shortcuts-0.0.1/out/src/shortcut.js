"use strict";
var vscode_1 = require('vscode');
var Shortcuts = (function () {
    function Shortcuts() {
        this.build = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.build.text = '$(file-binary)';
        this.test = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.test.text = '$(breaker)';
        this.term = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.term.text = '$(terminal)';
    }
    Shortcuts.prototype.show = function () {
        this.build.show();
        this.test.show();
        this.term.show();
    };
    Shortcuts.prototype.dispose = function () {
        this.build.dispose();
        this.test.dispose();
        this.term.dispose();
    };
    return Shortcuts;
}());
exports.Shortcuts = Shortcuts;
//# sourceMappingURL=shortcut.js.map