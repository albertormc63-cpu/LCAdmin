//importar .env para poder usar las variables de entorno --- IGNORE ---
import "dotenv/config";

//funcion para obtener la variable de entorno DATABASE_URL y validar que no sea nula o vacía
function obtenerVariableURL(nombreVariable: string): string {
    //almacenar la variable DATABASE_URL en una constante para poder usarla en la conexion a la base de datos
    const variableURL = process.env[nombreVariable];

    //validar que la variable de entorno no sea nula o vacía
    if (!variableURL || variableURL.trim() === '') {
        throw new Error(`La variable de entorno ${nombreVariable} no está definida.`);
    }
    //retornar la variable de entorno
    return variableURL;
}

function getPort(): number {
    const valorPort = process.env.PORT;
    const port = Number(valorPort);

    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
        throw new Error(`La variable de entorno PORT no es válida: ${valorPort}`);
    }

    return port;
}

//exportar variables que se usaran
export const env = {
    //obtener la variable de entorno DATABASE_URL usando la funcion obtenerVariableURL
    DATABASE_URL: obtenerVariableURL('DATABASE_URL'),
    //obtener la variable de entorno PORT usando la funcion getPort
    PORT: getPort(),
    HOST: process.env.HOST?.trim() || '0.0.0.0',
};