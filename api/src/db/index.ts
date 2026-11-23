// importamos el postgres para conectarnos a la base de datos
import postgres from "postgres";
//importamos drizzle para poder usarlo con postgres
import { drizzle } from "drizzle-orm/postgres-js";
//importamos .env para poder usar las variables de entorno
import "dotenv/config";

//creamos la conexion a la base de datos usando la variable de entorno DATABASE_URL
const sqlConnection = postgres(process.env.DATABASE_URL!);
//creamos la conexion a la base de datos usando drizzle y la conexion de postgres
export const db = drizzle(sqlConnection);
