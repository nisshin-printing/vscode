const {
    ExtensionContext,
    commands,
    window,
    Range,
    Position
} = require('vscode');

const {
    activeTextEditor
} = window;

let Converter = require('./converter').Converter
let colorValues = require('./colours/colours');

function activate(context) {
    let newTextContent = '';
    let textToInspect = '';
    let textContent = '';
    let selection = [];
    let matches = [];
    let values = [];
    let start = 0;
    let end = 0;

    // Expresiones a evaluar cuando se selecciona mucho texto.
    const regex = [
        new RegExp("#[\\d\\w]{3,6}"),
        new RegExp("rgb.*\\)"),
        new RegExp("\\d*px"),
        new RegExp("[(\\d|\\.)]*\\dem")
    ];

    // Para el input que solicita valores
    const units = [
        { label: 'px', description: 'Pixels' },
        { label: 'em', description: 'M' },
        { label: '#', description: 'Hexadecimal' },
        { label: 'rgb', description: 'Red Green Blue' },
        { label: 'rgba', description: 'Red Green Blue Alpha' },
        { label: 'color', description: 'Color value (e.g white)' }
    ];

    let command = commands.registerCommand('extension.unitConverter', () => {
        // Usar activeTextEditiro.selections ya que devuelve uno o más elementos seleccionados
        selection = window.activeTextEditor.selections;

        // Si son distintos significa que hay un elemento seleccionado
        if (selection[0].start.line !== selection[0].end.line ||
            selection[0].start.character !== selection[0].end.character) {

            // Solo para selecciones múltiples o simples.
            // Cualquiera de las dos es siempre en una sola línea.
            // De lo contrario no es iSingleLine y abarca un texto completo (más de una línea).
            if (selection[0].isSingleLine) {
                values = [];
                selection.forEach(v => {
                    start = v.start.character;
                    end = v.end.character;
                    textToInspect = activeTextEditor.document.lineAt(v.active.line).text.slice(start, end).trim();

                    // Validar si se está seleccionando una unidad conocida.
                    // De ser así, saltarse el paso de preguntar desde "qué unidad va a transformar"
                    // Para llevar luego a "a qué unidad va a convertir", de lo contrario mostrar mensaje de alerta
                    if (/\d+px|\d+em|#[\w\d]+|rgba/ig.test(textToInspect.trim()) &&
                        (matches = textToInspect.match(/px|em|#|rgb/ig)) !== null) {
                        // Ejecutar conversión y reemplazar directamente en el texto seleccionado
                        if (matches[0] === 'rgb') textToInspect.trim().replace('a', '');

                        Converter.value = textToInspect.trim().replace(matches[0], '');
                        Converter.setType(matches[0]);
                        values.push(Converter.value);
                    }else if (textToInspect.trim() in colorValues) {
                        values.push(colorValues[textToInspect.trim()]);
                    } else {
                        window.showErrorMessage('Please, check if you had selected the right values.');
                    }
                });
            } else {
                const r = new Range(
                    selection[0].start.line,
                    selection[0].start.character,
                    selection[0].end.line,
                    selection[0].end.character
                );

                textContent = activeTextEditor.document.getText(r);
                let _e = [];
                // Pasar cada línea del texto obtenido a un array para reccorrer línea por lína,
                // así eveitar que se sobre escriba lo que ya ha sido reemplazado.
                textContent = textContent.split("\n");
                textContent.forEach((l, i, arr)=> {
                    for (var c = 0; c < regex.length; c++) {
                        // Los valores a reemplazar obtenidos en el regex
                        if ((_e = regex[c].exec(l)) !== null) values = _e;
                    }
                    if (values.length > 0) {
                        if ((matches = values[0].match(/px|em|#|rgb/ig)) !== null) {
                            // Ejecutar conversión y reemplazar directamente en el texto seleccionado
                            if (matches[0] === 'rgb') values[0].replace('a', '');

                            Converter.value = values[0].replace(matches[0], '');
                            Converter.setType(matches[0]);
                            arr[i] = l.replace(values[0], Converter.value);
                        }
                    }

                    values = [];
                });
                newTextContent = textContent.join('\n');
            }

            // Reemplazar el texto seleccionado por el valor nuevo
            activeTextEditor.edit(builder => {
                if (selection[0].isSingleLine) {
                    for (var i = 0, size = selection.length; i < size; i++)
                        builder.replace(selection[i], values[i]);
                } else {
                    builder.replace(selection[0], newTextContent);
                }
            }).then((resolve, reason) => {});
        } else {
            // Desplegar listado de posibles unidades a convertir
            // Desde qué unidad
            window.showQuickPick(units, {
                matchOnDescription: true,
                placeHolder: 'Convert unit from:'
            }).then(resolve => {
                if (resolve !== undefined) {
                    let _type = resolve.label.toLowerCase();

                    // Desplegar un input para recibir el valor a convertir
                    window.showInputBox({
                        prompt: 'Set the value to convert:',
                        value: ''
                    }).then(resolve => {
                        if (resolve !== undefined) {
                            // Limpiar el valor en caso de que la persona
                            // ingrese el valor junto con la unidad
                            Converter.value = resolve.trim().replace(/px|em|#|rgb/ig, '');
                            Converter.setType(_type);
                            window.showInformationMessage(`The value is ${Converter.value}`);
                        }
                    });
                }
            });
        }
    });

    context.subscriptions.push(command);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;