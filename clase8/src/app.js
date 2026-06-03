import express from "express"
import config from "./config/config.js"
//import operacionCompleja from "./operacionCompleja.js";
import {fork} from "child_process"

const app = express();
app.listen(config.port, () => {
    console.log("Servidor activo: " + config.port);
})

app.get("/", (req, res) => {
    res.send("Entorno... (" + config.name  + ")");  
});

app.get("/saludo", (req, res) => {
    res.send("Hola a Todos!");  
});

app.get("/suma", (req, res) => {
    // Cuando se ejecuta sincrónicamente
    /* let resultado = operacionCompleja();
    res.send("Resultado: " + resultado); */

    // Cuando se ejecuta vía fork
    const child = fork("./src/operacionCompleja.js");
    child.send("Iniciando...");
    child.on("message", resultado => {
        res.send("Resultado de la Suma: " + resultado);
        child.kill();
    });
});