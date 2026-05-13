import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import passport from "passport"
import session from "express-session"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import __dirname, {authToken, generateToken } from "./utils.js"
import initializePassport from "./config/passport.config.js"

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoose.connect("mongodb+srv://javierveron:Javier123!@codercluster.d33hyf3.mongodb.net/?appName=CoderCluster", {dbName: 'clase5'});

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})

const SECRET_KEY = "S3CR3T0";
initializePassport();
app.use(session({
    secret:SECRET_KEY
}));
app.use(passport.initialize());
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

const users = [];

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    const newUser = req.body;
    users.push(newUser);
    const newToken = generateToken(newUser);

    res.send({status:"ok", token:newToken});
})

app.get("/current", authToken, (req, res) => {
    res.send({status:"ok", payload:req.user});
})