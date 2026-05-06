import { signedCookie } from "cookie-parser";
import Router from "express"
import { requiereAuth } from "../middlewares/auth.js"
import jwt from "jsonwebtoken"

const viewsRouter = Router();
const SECRET_KEY = "S3CR3T0";

viewsRouter.get("/login", (req, res) => {    
    res.render("login", {title:"Iniciar Sesión"})
});

viewsRouter.post("/login", async (req, res) => {
    //const {email, password} = req.params;
    const email = "mq@gmail.com";
    const password = 112233;  
    const result = await userModel.findOne({$and:[{email:email}, {password:password}]});
    const token = jwt.sign(result, SECRET_KEY, {expiresIn:"1h"});
    res.cookie("currentUser", token, {signed:true, maxAge:3600000});

    if (result) {
        console.log(res.cookie);
        
        //req.signedCookies("currentUser", result, {signed:true, maxAge:3600000});
        res.send({status:"ok"});
    }

    res.status(401).send({status:"error", message:"Usuario y/o Contraseña incorrecta!"});
});

viewsRouter.get("/current", requiereAuth, (req, res) => {
    res.render("current", {title:"Pantalla Principal"})
});

viewsRouter.post("/logout", (req, res) => {
    res.clearCookie("currentUser");
    res.redirect("/login");
})

export default viewsRouter