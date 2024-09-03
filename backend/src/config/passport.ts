import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import UserModel from "../models/user";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

passport.serializeUser((user, cb) => {//passport here stores user id for the session and provides a cookie for the frontend
    cb(null, user._id); //error fixed via passport-user.d.ts file, also make sure to change the tsconfig.json in the backend (typeRoots and end of file ts-node)
});

passport.deserializeUser((userId: string, cb) => {
    cb(null, { _id: new mongoose.Types.ObjectId(userId) }); //frontend makes a request using cookie, passport determines which session the cookie belongs to, gets user id from session (deserializes the encrypted userid into a userid that can be used)
});

passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        const existingUser = await UserModel.findOne({ username })
            .select('+email +password')
            .exec(); //exec() turns the const into a promise

        if (!existingUser || !existingUser.password) {
            return cb(null, false); //null for no error, false for did not find user based on username and password, it will return 401 response
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return cb(null, false); //we put return so the code will stop here and the rest of the function is not run
        }

        const user = existingUser.toObject();
        delete user.password;

        cb(null, user);
    } catch (error) {
        cb(error); //handled by passport and then sent to express error handler i.e. next(error)
    }
}));