// importar buildApp desde app.js (ojo, aunque sea en .ts los imports los hacemos con .js)
import { buildApp } from "./app.js"
//importar env.js para poder usar las varialbles de entorno validadas
import { env } from "./config/env.js";

//contruimos nuestra app con la funcion buildApp de app.js
const app = buildApp();

//iniciamos el servidor en el puerto 3000 y host
const iniciarServidor = async () => {
    try {
        await app.listen({
            port: env.PORT,
            host: env.HOST
        })
        // console.log("Servidor iniciado en http://127.0.0.1:3000");
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

iniciarServidor();