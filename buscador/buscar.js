var fs = require("fs");
const csv = require('csvtojson/v2')
const colors = require('colors');

let readCSV = async(path) => {
    var csvStr
    try {
        csvStr = fs.readFileSync(path, "utf-8");
    } catch (error) {
        throw new Error(`El archivo csv no existe`)
    }
    if (csvStr.indexOf("IT.NET.USER.ZS") > 0 && csvStr.indexOf("Country") > 0 && csvStr.indexOf("IT.NET.USER.ZS") && csvStr.indexOf("Country") == 94) {
        csvStr = csvStr.substring(csvStr.indexOf("Country") - 1);
        return csv().fromString(csvStr).then((jsonObj) => jsonObj)
    } else {
        throw new Error(`El Archivo no tiene el formato correcto`);
    }



}
let getJSON = async(path) => {
    let data = await readCSV(path);
    return data;
}
async function buscarPais(pais, year, json) {
    var jsonOB = json
    let aux
    for (var item in jsonOB) {
        temp = jsonOB[item]['Country Code']
        if (pais == temp) {
            aux = jsonOB[item]
            break;
        }
    }
    return { name: aux['Country Name'], suscripciones: aux[year], anio: year, code: pais }

}
async function analizar(pais, year, csvpath) {
    let errorCode = 'El parámetro country debe ser un código ISO 3166 ALPHA-3.'
    try {
        pais = pais.toUpperCase()
        let codeP = lookup.countries({ alpha3: pais })[0];
        if (codeP == undefined) {
            throw new Error(errorCode)
        }
    } catch (error) { //ISO 3166 ALPHA-3
        throw new Error(errorCode)
    }
    let msg
    let jsonOB = await getJSON(csvpath).then().catch(err => msg = err.message);
    try {
        let paisOB = await buscarPais(pais, year, jsonOB)

        let comparacion
            //Verificar existencia de registros
        if (!Number.isInteger(year) || year < 1960) {
            msg = `El valor del parámetro year deber ser un número mayor o igual a 1960`
            throw new Error(msg)

        } else if (paisOB.suscripciones <= 0) {
            comparacion = `El país ${paisOB.name} no tiene Personas que usan Internet (% de la población) resgistradas  en el año ${year}  `
        }
    } catch (error) {
        throw new Error(msg)
    }
}

function printConsola(datos) {
    console.log(colors.titulos(
        '______________________________________________________________\n|             UNIVERSIDAD POLITÉCNICA SALESIANA              |\n|          INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN          |\n|                  EXAMEN PLATAFORMAS WEB                  |\n|             SUSCRIPCIONES A TELEFONÍA CELULAR              |\n|____________________________________________________________|\n'));
    console.log(colors.blue(`- Datos:	Personas que usan Internet (% de la población)`));
    console.log(colors.blue(`- País: ${datos[0].name}\n`));
    console.log(colors.blue(`- Año: ${datos[0].anio}\n`));
    console.log(colors.blue(`- Valor: ${datos[0].suscripciones}\n`));
}

module.exports = {
    analizar,
    printConsola
}