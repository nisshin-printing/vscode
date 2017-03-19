'use strict';
let csstreeValidator = require('csstree-validator');
const TYPE_WARNING = 'Warning';
const TYPE_ERROR = 'Error';
const SEVERITY_WARNING = 'warning';
const SEVERITY_ERROR = 'error';
function wrapper(options) {
    let report = csstreeValidator.validateString(options.code);
    let diagnostics = [];
    report = Object.keys(report).reduce((r, c) => r.concat(report[c]), []);
    report.forEach(warning => {
        let doc = options.document;
        let range = {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 0 }
        };
        let severity = 2 /* Warning */;
        range.start = { line: warning.line - 1, character: warning.column - 1 };
        if (warning.loc) {
            let endLine = warning.loc.end.line - 1;
            let endColumn = warning.loc.end.column - 1;
            if (!warning.message.indexOf('Unknown property')) {
                range.end = { line: range.start.line, character: range.start.character + warning.property.length };
            }
            else {
                range.end = { line: endLine, character: endColumn };
            }
        }
        else {
            severity = 1 /* Error */;
            range.end = { line: range.start.line, character: range.start.character + 1 };
        }
        diagnostics.push({
            range,
            severity,
            message: `[CSSTree] ${warning.message}`
        });
    });
    return Promise.resolve(diagnostics);
}
exports.wrapper = wrapper;
;
//# sourceMappingURL=wrapper.js.map