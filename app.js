const argv = require('./config/yargs').argv;
const { analizar, printConsola } = require('./buscador/buscar')

const colors = require('colors');
let comando = argv._[0]
let path = argv.archivo
let pais = argv.pais
let year = argv.anio
let data = ""
let procesar = (callback) => {
    if (comando != 'mostrar' && comando != 'guardar') {
        console.log("Comando no reconocido");
    } else {
        console.log("p", pais);
        console.log("y", year);
        console.log("p", path);
        analizar(pais, year, path)
            .then(datos => {
                data = datos
                printConsola(datos)
                console.log(data);
                callback();
            })
            .catch(err => colors.red(err.message, "error"))
    }
}

//function switchF() {
//console.log(comando);

switch (comando) {
    case 'mostrar':
        procesar(comando)
        console.log("Entro a mostrar");
        break;
    case 'guardar':

        break;

    default:
        console.log(colors.red("Comando no reconocido"));
}
//}
//procesar(switchF)