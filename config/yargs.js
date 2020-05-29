let cparametros = {
    archivo: {
        demand: true,
        alias: 'f',
        desc: 'Permite establecer el path del archivo CSV que contiene los datos a analizar'
    },
    pais: {
        alias: 'c',
        default: "ECU",
        desc: "Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3."
    },
    anio: {
        alias: 'y',
        default: 1960,
        desc: 'Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 1960.'
    }

}


const argv = require('yargs').command('mostrar', ' Este comando imprime en pantalla el resultado de la búsqueda.', cparametros).command('guardar', '  Este comando genera un archivo de texto con el resultado de la búsqueda.', cparametros).argv;

module.exports = {
    argv
}