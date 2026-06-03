/* console.log("Directorio:", process.cwd());
console.log("Id del Proceso:", process.pid);
console.log("Uso de Memoria:", process.MemoryUsage);
console.log("Versión Node:", process.version);
console.log("Argumentos:", process.argv);
console.log(process.argv.slice(2)); */

import {Command} from "commander"

const program = new Command();
program
.option("-d <debug>", "Variable debug", false)
.option("-p <port>", "Puerto", 8080)
.option("--mode <mode>", "Modo (Producción)", "produccion")
.option("-u <user>", "Usuario", "admin");
program.parse();
console.log("Options:", program.opts());
//console.log("Arguments:", program.args);
console.log("Modo:", program.opts().mode);
console.log("Puerto:", program.opts().p);
console.log("Usuario:", program.opts().u);
