import passport from "passport"
import jwt from "passport-jwt"

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (request) => {
    let token = null;

    if (request && request.cookies) {
        token = request.cookies["CoderCookie"];
    }

    return token;
}

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:"S3CR3T"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch(error) {
            return done(error);
        }
    }));
}

export default initializePassport