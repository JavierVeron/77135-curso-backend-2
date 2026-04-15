import express from "express"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import session from "express-session"
import viewRouter from "./routes/view.router.js";
import __dirname from "./utils.js"

const ADMIN_USER = "santi.cardenas@gmail.com";
const ADMIN_PASS = "224466";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewRouter);
app.use(cookieParser("K0di1G0S3cr3t0"));
app.use(session({
    secret:"S3CR3T0",
    resave:true,
    saveUninitialized:true
}))

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})

// Cookie Parser
/* app.get("/setCookie", (req, res) => {
    res.cookie("CoderCookie", "Curso de Backend 2", {maxAge:50000}).send("Cookie Creada!");
})

app.get("/setSignedCookie", (req, res) => {
    res.cookie("CoderCookie", "Curso de Backend 2 (Signada)", {maxAge:50000, signed:true}).send("Cookie Signed Creada!");
})

app.get("/getCookie", (req, res) => {
    res.send(req.cookies); // Acceder a la Cookie sin estar signada
})

app.get("/getSignedCookie", (req, res) => {
    res.send(req.signedCookies); // Acceder a la Cookie signada
})

app.get("/deleteCookie", (req, res) => {
    res.clearCookie("CoderCookie").send("Cookie Eliminada!");
}) */


// Ejemplo Form
/* app.get("/getCookieForm", (req, res) => {
    res.send(req.cookies);
})

app.post("/setCookieForm", (req, res) => {
    const {email, contrasena} = req.body;
    const usuario = {email, contrasena};    
    res.cookie("cookieForm", usuario, {maxAge:10000}).send({status:"ok", message:"Cookie Signed Creada!"});
}) */


// Sessions
app.get("/session", (req, res) => {
    if (req.session.contador) {
        req.session.contador++;
        res.send("El contador de sesión es: " + req.session.contador);
    } else {
        req.session.contador = 1;
        res.send("Bienvenido!");
    }
})

export const auth = (req, res, next) => {
    if (req.session?.user == ADMIN_USER && req.session?.pass == ADMIN_PASS) {
        return next();
    }

    return res.status(401).send('Error de Autorización!');
}

app.post("/login", (req, res) => {
    const {email, contrasena} = req.body;

    if (email == ADMIN_USER && contrasena == ADMIN_PASS) {        
        req.session.user = email;
        req.session.pass = contrasena;
        return res.send({status:"ok", message:"Sesión iniciada!"});
    }

    return res.status(401).send({status:"error", message:"Error de Autorización!"});
})

app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
})

app.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send({status:"error", message:"Error al eliminar la sesión!"});
        } else {
            res.send({status:"ok", message:"La sesión se ha eliminado correctamente!"});
        }
    })
})