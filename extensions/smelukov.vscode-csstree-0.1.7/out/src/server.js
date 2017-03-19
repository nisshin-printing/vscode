'use strict';
const wrapper_1 = require("./wrapper");
const vscode_languageserver_1 = require("vscode-languageserver");
let config;
let connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
let documents = new vscode_languageserver_1.TextDocuments();
function validate(document) {
    return wrapper_1.wrapper({
        code: document.getText(),
        document,
        config,
    }).then(diagnostics => {
        connection.sendDiagnostics({ uri: document.uri, diagnostics });
    }).catch(err => {
        connection.window.showErrorMessage(err.stack.replace(/\n/g, ' '));
    });
}
function validateAll() {
    return Promise.all(documents.all().map(doc => validate(doc)));
}
connection.onInitialize(params => {
    validateAll();
    return {
        capabilities: {
            textDocumentSync: documents.syncKind
        }
    };
});
connection.onDidChangeConfiguration(params => {
    let settings = params.settings;
    config = settings.csstree.config;
    validateAll();
});
documents.onDidChangeContent(event => validate(event.document));
documents.onDidClose(e => connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] }));
documents.listen(connection);
connection.onDidChangeWatchedFiles(validateAll);
connection.listen();
//# sourceMappingURL=server.js.map