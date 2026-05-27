import CustomRouter from "../customRouter/Router.js";

class UsersRouter extends CustomRouter {
    init() {
        this.get("/", (req, res) => {
            res.send("Hola Users!");
        })
    }
}

export default UsersRouter