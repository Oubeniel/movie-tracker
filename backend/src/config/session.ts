import { SessionOptions } from "express-session";
import MongoStore from 'connect-mongo'
import env from "../env";

const sessionConfig: SessionOptions = {
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //1 week
        //maxAge: 60 * 60 * 1000, //1 hour
    },
    rolling: true, //as long as website is used and requests are made, the cookie age will reset
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}

export default sessionConfig;