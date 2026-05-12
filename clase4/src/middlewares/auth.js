import jwt from "jsonwebtoken"

const SECRET_KEY = "S3CR3T0";

export const requireAuth = (req, res, next) => {
    const token = req.signedCookies?.currentUser;
    if (!token) return res.redirect("/users/login");
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.clearCookie("currentUser");
        res.redirect("/users/login");
    }
};

export const redirectIfAuth = (req, res, next) => {
    const token = req.signedCookies?.currentUser;
    if (!token) return next();
    try {
        jwt.verify(token, JWT_SECRET);
        res.redirect("/users/current");
    } catch {
        res.clearCookie("currentUser");
        next();
    }
};