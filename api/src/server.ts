import Fastify from "Fastify";

const app = Fastify({
    logger: true
});

app.get("/", async () => {
    return { message: "LC Admin API" };
});

const iniciarServidor = async () => {
    try {
        await app.listen({
            port: 3000,
            host: "127.0.0.1"
        })
        console.log("Servidor iniciado en http://127.0.0.1:3000");
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

iniciarServidor();