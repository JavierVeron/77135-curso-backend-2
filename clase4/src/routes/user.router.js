import Router from "express"
import userModel from "../models/user.model.js";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {    
    //const {email, password} = req.body;
    const email = "mq@gmail.com";
    const password = 112233;
    const result = await userModel.findOne({$and:[{email:email}, {password:password}]});

    if (result) {        
        res.send({status:"ok"});
    }

    res.status(401).send({status:"error", message:"Usuario y/o Contraseña incorrecta!"});
})

userRouter.post("/logout", async (req, res) => {
    
})

userRouter.post("/", async (req, res) => {
    const {first_name, last_name, email, role, password} = req.body;

    if (!first_name || !last_name || !email || !role || !password) {
        res.status(400).send({status:"error", message:"Debe completar todos los campos!"});
    }

    const result = await userModel.insertOne(req.body);

    if (result) {
        return res.send({status:"ok", message:"El usuario se creó correctamente!", data:result});
    }

    res.status(400).send({status:"error", message:"No se pudo crear el Usuario!"});
})

export default userRouter