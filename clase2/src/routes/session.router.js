import Router from "express"
import userModel from "../models/user.model.js"

const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
    const user = req.body;    
    const result = await userModel.findOne({$and:[{email:user.email}, {password:user.contrasena}]});

    if (result) {        
        req.session.activa = true;
        req.session.nombre = result.first_name;
        req.session.email = result.email;
        req.session.user = result;
        res.send({status:"ok"});

        return false;
    }

    res.status(401).send({status:"error", message:"Usuario y/o Contraseña incorrecta!"});
})

sessionRouter.post("/registrar", async (req, res) => {
    const user = req.body;
    const result = await userModel.insertOne(user);

    if (result) {
        res.send({status:"ok", message:"El usuario se creó correctamente!"});
        
        return false;
    }

    res.send({status:"error", message:"Error! El usuario no se creó!"});
})

sessionRouter.put("/modificar", async (req, res) => {
    const email = req.session.email;    

    if (!email) {
        res.status(403).send({status:"error", message:"Debe iniciar sesión!"});
    }

    const user = req.body;
    const result = await userModel.updateOne({email:email}, user);

    if (result) {
        req.session.user = await userModel.findOne({email:email});
        res.send({status:"ok", message:"El usuario se modificó correctamente!"});
        
        return false;
    }

    res.send({status:"error", message:"Error! El usuario no se modificó!"});
})

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send({status:"error", message:"Error al eliminar la sesión!"});
        } else {
            res.send({status:"ok", message:"La sesión se ha eliminado correctamente!"});
        }
    })
})

export default sessionRouter