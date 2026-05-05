import Router from "express"

const viewRouter = Router();

const estaLogueado = (req, res, next) => {
    if (req.session.activa) {
        return res.redirect("/principal");
    }

    return next();
}

const noEstaLogueado = (req, res, next) => {
    if (req.session.activa) {
        return next();
    }

    res.redirect("/");
}

viewRouter.get("/", estaLogueado, (req, res) => {   
    res.render("index", {title:"Iniciar Sesión"});
})

viewRouter.get("/registrar", (req, res) => {
    res.render("registrar", {title:"Registrar Usuario"});
})

viewRouter.get("/principal", noEstaLogueado, (req, res) => {
    res.render("principal", {title:"Página Principal", nombre:req.session.nombre});
})

viewRouter.get("/perfil", noEstaLogueado, (req, res) => {
    res.render("perfil", {title:"Modificar Perfil", user:req.session.user});
})

viewRouter.get("/failRegistrar", (req, res) => {
    console.log("Error en la registración");
    res.send({status:"error", message:"Error en la Registración!"});
})

export default viewRouter