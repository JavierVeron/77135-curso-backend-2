import passport from "passport"
import local from "passport-local"
import userModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"}, async (req, username, password, done) => {
            const {fist_name, last_name, email, age} = req.body;
    
            try {
                const user = await userModel.find({email:username});
    
                if (user) {
                    console.log("Ya existe el Usuario registrado!");
                    return done(null, false);
                }
    
                const newUser = {
                    first_name:fist_name,
                    last_name:last_name,
                    email:email,
                    age:age,
                    password:createHash(password)
                }
    
                await userModel.insertOne(newUser);
            } catch (error) {
                return done("[Error]: " + error);
            }
        }
    ))
}

export default initializePassport