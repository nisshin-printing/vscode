"use strict";
var vscode_1 = require('vscode');
var cursorRuler_1 = require('./cursorRuler');
var cursorRulerController_1 = require('./cursorRulerController');
function activate(context) {
    var config = vscode_1.workspace.getConfiguration('cursor-ruler');
    if (!config.has('enabled') || !config['enabled']) {
        return false;
    }
    var cursorRuler = new cursorRuler_1.CursorRuler();
    cursorRuler.updateStyling(config);
    var controller = new cursorRulerController_1.CursorRulerController(cursorRuler);
    context.subscriptions.push(controller);
    context.subscriptions.push(cursorRuler);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map