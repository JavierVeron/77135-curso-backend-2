import Router from "express"
import { auth } from "../app.js";

const viewRouter = Router();

viewRouter.get("/", (req, res) => {    
    res.render("index", {title:"Iniciar Sesión"});
})

viewRouter.get("/principal", (req, res) => {
    res.render("principal", {title:"Página Principal"});
})

export default viewRouter