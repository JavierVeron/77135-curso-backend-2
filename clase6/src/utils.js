import {fileURLToPath} from "url"
import {dirname} from "path"
import jwt from "jsonwebtoken"
import passport from "passport"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(error, user, info) {
            if (error) next(error);

            const authHeader = req.headers['authorization'];

            if (!authHeader) {
                return res.status(401).send({status:"error", message:"No Autenticado!"});
            }

            const token = authHeader.split(" ")[1];

            jwt.verify(token, "S3CR3T", (error, credentials) => {       
                if (error) {
                    return res.status(403).send({status:"error", message:"No Autorizado!"})
                }

                req.user = {email:credentials.email, role:credentials.role};
                next();
            })
        })(req, res, next);
    }
}