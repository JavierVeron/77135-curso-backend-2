import jwt from "jsonwebtoken"

const SECRET_KEY = "S3CR3T0";

export const requiereAuth = (req, res , next) => {
    const token = req.signedCookies

    if (!token) {
        res.redirect("/login")
    } else {
        next();
    }
}