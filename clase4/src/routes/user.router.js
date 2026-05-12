import Router from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

const userRouter = Router();
const JWT_SECRET = "JWT_S3CR3T0";

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: "error", message: "Email y contraseña son obligatorios" });
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).send({ status: "error", message: "Credenciales inválidas" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ status: "error", message: "Credenciales inválidas" });
        }

        const tokenPayload = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("currentUser", token, {
            signed: true,
            httpOnly: true,
            maxAge: 3600000
        });

        res.send({ status: "ok", message: "Login exitoso" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

userRouter.get("/", async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 });
        res.send({ status: "ok", users });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

userRouter.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send({ status: "error", message: "Faltan campos obligatorios" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ first_name, last_name, email, age, password: hashedPassword });
        res.status(201).send({ status: "ok", message: "Usuario creado", id: newUser._id });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ status: "error", message: "El email ya está registrado" });
        }
        res.status(500).send({ status: "error", message: error.message });
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id, { password: 0 });
        if (!user) return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        res.send({ status: "ok", user });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

/* userRouter.put("/:id", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const updateData = { first_name, last_name, email, age };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const updated = await userModel.findByIdAndUpdate(req.params.id, updateData, { new: true, projection: { password: 0 } });
        if (!updated) return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        res.send({ status: "ok", message: "Usuario actualizado", user: updated });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        const deleted = await userModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        res.send({ status: "ok", message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
}); */

export default userRouter