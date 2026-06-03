import dotenv from "dotenv"
import {Command} from "commander"

// Configuración para 1 sola variable de entorno (FIJA)
/* dotenv.config();

export default {
    name:process.env.NAME,
    port:process.env.PORT
} */


// Configuración para 2 variables de entorno (FIJO)
/* const enviroment = "PRODUCCION";

dotenv.config({
    path:enviroment == "PRODUCCION" ? ".env.produccion" : ".env.desarrollo"
})

export default {
    name:process.env.NAME,
    port:process.env.PORT
} */


// Configuración para 2 variables de entorno (DINÁMICO CON ARGUMENTOS)
const program = new Command();
program.option("--mode <mode>", "Entorno del Servidor", "DESARROLLO");
program.parse();

dotenv.config({
    path:program.opts().mode == "PRODUCCION" ? ".env.produccion" : ".env.desarrollo"
})

export default {
    name:process.env.NAME,
    port:process.env.PORT
}