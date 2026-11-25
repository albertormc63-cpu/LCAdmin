// importamos el postgres para conectarnos a la base de datos
import postgres from "postgres";
//importamos drizzle para poder usarlo con postgres
import { drizzle } from "drizzle-orm/postgres-js";
//importar env.js para poder usar las varialbles de entorno validadas
import { env } from "../config/env.js";

//creamos la conexion a la base de datos usando la variable de entorno DATABASE_URL
const sqlConnection = postgres(env.DATABASE_URL);

//creamos la conexion a la base de datos usando drizzle y la conexion de postgres
export const db = drizzle(sqlConnection);

//exportar funcion asincrona de cierre de postgres en un promise para poder usarla en otros modulos
export async function cerrarConnection(): Promise<void> {
    //esperamos a que se cierre la conexion de postgres
    await sqlConnection.end();
}