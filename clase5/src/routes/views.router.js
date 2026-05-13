import Router from "express"

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    res.render("home");
})

viewsRouter.get("/login", (req, res) => {
    res.render("login");
})

export default viewsRouter