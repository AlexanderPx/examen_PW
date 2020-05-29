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
    return { name: aux['Country Name'], suscripciones: aux[year], anio: year, code: pais, desc: aux['Indicator Name'] }

}
async function analizar(pais, year, csvpath) {

    let msg
    let jsonOB = await getJSON(csvpath).then().catch(err => msg = err.message);

    try {
        let paisOB = await buscarPais(pais, year, jsonOB)
        printConsola(paisOB)
        if (!Number.isInteger(year) || year < 1960) {
            msg = `El valor del parámetro year deber ser un número mayor o igual a 1960`
            throw new Error(msg)
        }
    } catch (error) {
        throw new Error(msg)
    }
}


function printConsola(datos) {
    let comparacion
    if (datos.suscripciones <= 0) {
        comparacion = `El país ${datos.name} no tiene Personas que usan Internet (% de la población) resgistradas  en el año ${datos.anio}  `
    } else {
        comparacion = datos.suscripciones
    }
    console.log(colors.green(
        '______________________________________________________________\n|             UNIVERSIDAD POLITÉCNICA SALESIANA              |\n|          INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN          |\n|                  EXAMEN PLATAFORMAS WEB                  |\n|               PERSONAS QUE USAN INTERNET              |\n|____________________________________________________________|\n'));
    console.log(colors.blue("- Datos: "), colors.green(`${datos.desc}\n`));
    console.log(colors.blue("- País: "), colors.green(` ${datos.name}\n`));
    console.log(colors.blue("- Año: "), colors.green(`${datos.anio}\n`));
    console.log(colors.blue("- Valor: "), colors.green(`${comparacion}\n`));
}

async function guardartxt(pais, year, csvpath) {
    let msg
    let jsonOB = await getJSON(csvpath).then().catch(err => msg = err.message);

    try {
        let paisOB = await buscarPais(pais, year, jsonOB)
        let comparacion

        if (!Number.isInteger(year) || year < 1960) {
            msg = `El valor del parámetro year deber ser un número mayor o igual a 1960`
            throw new Error(msg)

        } else if (paisOB.suscripciones <= 0) {
            comparacion = `El país ${paisOB.name} no tiene Personas que usan Internet (% de la población) resgistradas  en el año ${paisOB.anio}  `
        } else {
            comparacion = paisOB.suscripciones
        }

        data = '______________________________________________________________\n|             UNIVERSIDAD POLITÉCNICA SALESIANA              |\n|          INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN          |\n|                  EXAMEN PLATAFORMAS WEB                  |\n|               PERSONAS QUE USAN INTERNET              |\n|____________________________________________________________|\n';

        data += `- Datos: ${paisOB.desc}\n`;
        data += `- País: ${paisOB.name}\n`;
        data += `- Año: ${paisOB.anio}\n`;
        data += `- Valor: ${comparacion}\n`;

        fs.writeFile(`resultados/${paisOB.code}-${paisOB.anio}.txt`, data, (err) => {
            if (err) {
                msg = `No se pudo crear el archivo txt`
                throw new Error(msg)
            } else {
                console.log(colors.green(`El archivo ${paisOB.code}-${paisOB.anio}.txt ha sido guardado con éxito!`));
            }

        });

    } catch (error) {
        throw new Error(msg)
    }
}
module.exports = {
    analizar,
    guardartxt
}