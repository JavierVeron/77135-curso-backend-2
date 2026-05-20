import express from "express"
import __dirname, { passportCall } from "./utils.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import passport from "passport"
import initializePassport from "./config/passport.config.js";
import { authorization } from "./middleware/authorization.js"

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})

/* app.get("/current", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.send(req.user);
}) */

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
    console.log("Acceso permitido para Usuarios!");
    res.send(req.user);
})

app.get("/admin", passportCall("jwt"), authorization("admin"), (req, res) => {
    console.log("Acceso permitido para Administradores!");
    res.send(req.user);
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    const ADMIN_USER = "al@gmail.com";
    const ADMIN_PASS = 112233;
    const USER_USER = "jv@gmail.com";
    const USER_PASS = 223344;
    let user;

    if (email == ADMIN_USER && password == ADMIN_PASS) {
        user = {email, password, role:"admin"};
    } else if (email == USER_USER && password == USER_PASS) {
        user = {email, password, role:"user"};
    }

    if (user) {
        let token = jwt.sign(user, "S3CR3T", {expiresIn:"1h"});
        //res.send({status:"ok", message:"Sesión Iniciada!", token:token});
        res.cookie("CoderCookie", token, {maxAge:3600, httpOnly:true}).send({status:"ok", message:"Sesión Iniciada!", token:token});
    } else {
        res.status(401).send({status:"error", message:"Datos inválidos!"})
    }
})