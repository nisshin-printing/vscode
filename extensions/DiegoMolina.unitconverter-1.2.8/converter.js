let colorValues = require('./colours/colours');

function hexToRgb (val) {
    let _val = val;
    // Dividir el valor exadecimal en las siguientes posibles formas
    // Si son tres = [f, f, f]
    // Si son seis = [ff, ff, ff]
    let hex = _val.length > 3 ? _val.match(/.{2}/ig) : _val.split('');
    hex.forEach((v, i, arr) => {
        arr[i] = parseInt((v.length > 1 ? v : `${v}${v}`), 16).toString();
    });
    return `rgba(${hex.join(', ')}, 1) | rgb(${hex.join(', ')})`;
}

function rgbToHex (val) {
    let _val = val;
    let strInt = 0;

    // Elminar los parentecis del valor y convertir el string en un array
    // Como la conversión es a hexadecimal de 6 dígitos (omitiendo el alpha)
    // el valor es independiente de este, osea si se pasa un valor rgba el
    // array resultante será de largo 4 (útlimo valor el alpha), debiendo eliminar el último
    let rgb = _val.replace(/\(|\)|a/g, '').split(',');
    rgb.forEach((v, i, arr) => {
        strInt = parseInt(v.trim());
        arr[i] = strInt < 10 ? `${strInt}${strInt}` : strInt.toString(16);
    });

    if (rgb.length > 3) rgb.pop();

    return `#${rgb.join('')}`;
}

function pxToEm (val) {
    let _val = val;
    return `${parseInt(_val, 10) / 16}em`;
}

function emToPx (val) {
    let _val = val;
    return `${Math.round(parseFloat(_val) * 16)}px`;
}

function colorValueToHex(val) {
    let _val = val;
    return _val in colorValues ? colorValues[_val] : _val;
}

let Converter = {
    value: '',
    setType: function (_type) {
        switch (_type) {
            case '#': this.value = hexToRgb(this.value); break;
            case 'rgb':
            case 'rgba': this.value = rgbToHex(this.value); break;
            case 'px': this.value = pxToEm(this.value); break;
            case 'em': this.value = emToPx(this.value); break;
            case 'color': this.value = colorValueToHex(this.value); break;
        }
    }
}

exports.Converter = Converter