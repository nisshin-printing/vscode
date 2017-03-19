var vscode = require('vscode');
var ai = require('applicationinsights');
ai.setup('695ef12d-e9e9-46f3-8c76-1d94bbe763b2');
function trackEvent(code, properties, measurements) {
    var payload = {
        code: code,
        properties: properties,
        measurements: measurements
    };
    console.log(JSON.stringify(payload, null, '\t'));
    var configuration = vscode.workspace.getConfiguration('ecdc');
    var collectTelemetry = configuration.get('collectTelemetry');
    if (collectTelemetry) {
        ai.client.trackEvent(code, properties);
    }
}
exports.trackEvent = trackEvent;
//# sourceMappingURL=telemetry.js.map