import express from "express"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import session from "express-session"
//import FileStore from "session-file-store"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import viewRouter from "./routes/view.router.js"
import sessionRouter from "./routes/session.router.js"
import __dirname from "./utils.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"

//const fileStore = FileStore(session);
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(session({
    //store:new fileStore({path:"./sessions", ttl:60, retries:0}),
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://javierveron:Javier123!@codercluster.d33hyf3.mongodb.net/?appName=CoderCluster",
        ttl:100
    }),
    secret:"S3CR3T0",
    resave:false,
    saveUninitialized:false
}))

mongoose.connect("mongodb+srv://javierveron:Javier123!@codercluster.d33hyf3.mongodb.net/?appName=CoderCluster");

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})

app.use("/", viewRouter);
app.use("/api/sessions", sessionRouter);

/* Ejemplo de Sessions */
/* app.get("/", (req, res) => {
    req.session.nombre = "Santiago Cardenas";
    req.session.producto = {id:1, nombre:"Nike Air Jordan", precio:180, categoria:"Zapatillas"};
    res.send("Hola Mundo!");
})

app.get("/productos", (req, res) => {
    res.send(req.session.producto);
}) */