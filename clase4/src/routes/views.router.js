import Router from "express"
import jwt from "jsonwebtoken"
import { signedCookie } from "cookie-parser"
import { requireAuth, redirectIfAuth } from "../middlewares/auth.js"

const viewsRouter = Router();
const SECRET_KEY = "S3CR3T0";

viewsRouter.get("/login", redirectIfAuth, (req, res) => {
    res.render("login", { title: "Iniciar Sesión" });
});

viewsRouter.post("/login", redirectIfAuth, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email?.toLowerCase() });
        if (!user) {
            return res.send(`<script>alert("Login failed!"); window.location.href="/users/login";</script>`);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.send(`<script>alert("Login failed!"); window.location.href="/users/login";</script>`);
        }

        const token = jwt.sign(
            {id:user._id, first_name:user.first_name, last_name:user.last_name, email:user.email, age:user.age},
            JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.cookie("currentUser", token, { signed: true, httpOnly: true, maxAge: 3600000 });
        res.redirect("/users/current");
    } catch {
        res.send(`<script>alert("Login failed!"); window.location.href="/users/login";</script>`);
    }
});

viewsRouter.get("/current", requireAuth, (req, res) => {
    const { first_name, last_name, email, age } = req.user;
    res.render("current", { title: "Mi Perfil", first_name, last_name, email, age });
});

viewsRouter.get("/logout", (req, res) => {
    res.clearCookie("currentUser", { signed: true, httpOnly: true });
    res.redirect("/users/login");
});

export default viewsRouter