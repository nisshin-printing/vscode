'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var shortcuts_1 = require('./shortcuts');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var shortcuts = new shortcuts_1.Shortcuts(vscode.workspace.getConfiguration('shortcuts'));
    shortcuts.show();
    context.subscriptions.push(shortcuts);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map