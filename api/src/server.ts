// importar buildApp desde app.js (ojo, aunque sea en .ts los imports los hacemos con .js)
import { buildApp } from "./app.js"

//contruimos nuestra app con la funcion buildApp de app.js
const app = buildApp();

const iniciarServidor = async () => {
    try {
        await app.listen({
            port: 3000,
            host: "0.0.0.0"
        })
        // console.log("Servidor iniciado en http://127.0.0.1:3000");
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

iniciarServidor();