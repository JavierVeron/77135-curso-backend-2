import {fileURLToPath} from "url"
import {dirname} from "path"
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SECRET_KEY = "S3CR3T0";

export const generateToken = (user) => {    
    const token = jwt.sign(user, SECRET_KEY, {expiresIn:"1h"});

    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({status:"error", message:"No Autenticado!"});
    }

    const token = authHeader.split(" ")[2];
    jwt.verify(token, SECRET_KEY, (error, credentials) => {       
        if (error) {
            return res.status(403).send({status:"error", message:"No Autorizado!"})
        }

        req.user = credentials.user;

        next();
    })
}

export default __dirname;