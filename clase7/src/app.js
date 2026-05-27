import express from "express"
import __dirname from "./utils.js"
import dictionaryRoutes from "./routes/dictionary.router.js";
import petsRoutes from "./routes/pets.router.js";
import UsersRouter from "./routes/users.router.js";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/api/dictionary", dictionaryRoutes);
app.use("/api/pets", petsRoutes);
const userRouter = new UsersRouter();
app.use("/api/users", userRouter.getRouter());

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})