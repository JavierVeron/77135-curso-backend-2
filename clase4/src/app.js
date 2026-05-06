import express from "express"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import viewsRouter from "./routes/views.router.js"
import userRouter from "./routes/user.router.js"
import __dirname from "./utils.js"

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const SECRET_KEY = "S3CR3T0";
app.use(cookieParser(SECRET_KEY));

mongoose.connect("mongodb+srv://javierveron:Javier123!@codercluster.d33hyf3.mongodb.net/?appName=CoderCluster", {dbName: 'integrative_practice'});

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})

app.use("/", viewsRouter);
app.use("/api/users", userRouter);