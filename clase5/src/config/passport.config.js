import passport from "passport"
import { Strategy as GitHubStrategy } from "passport-github2"
import userService from "../models/Users.js"

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });

    passport.use("github", new GitHubStrategy({
        clientID: "Iv23liZExNCX0k7T6eSq",
        clientSecret:"fed856595455d063ff5e36f4347e5145f856ae93",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            //console.log(profile);
            let user = await userService.findOne({email:profile._json.email});

            if (user) {
                return done(null, user);
            } else {
                let newUser = {name:profile._json.name, lastname:"Coder", age:24, email:profile._json.email, password:"112233"};
                const result = await userService.create(newUser);

                return done(null, result);
            }

        } catch(error) {
            return done(error);
        }
    }));
}

export default initializePassport