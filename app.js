const argv = require('./config/yargs').argv;
const { analizar, guardartxt } = require('./buscador/buscar')

const colors = require('colors');
let comando = argv._[0]
let path = argv.archivo
let pais = argv.pais
let year = argv.anio


switch (comando) {
    case 'mostrar':
        analizar(pais, year, path).then(data => {}).catch(err => console.log(err.message, "error"));
        break;
    case 'guardar':

        guardartxt(pais, year, path).then(data => {}).catch(err => console.log(err.message, "error"));
        break;

    default:
        console.log(colors.red("Comando no reconocido"));
}