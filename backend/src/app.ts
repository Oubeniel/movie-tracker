import "dotenv/config";
import express from "express";
import movieRoutes from "./routes/movie";
import userRoutes from "./routes/users";
import cors from "cors"
import env from "./env";
import morgan from "morgan";
//import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import createHttpError from "http-errors";
import session from "express-session";
import sessionConfig from "./config/session";
import passport from "passport";
import './config/passport'; //importing like this executes the contents of the aforementioned file

const app = express();

app.use(cors({
    origin: env.WEBSITE_URL,
    credentials: true,
}));
app.use(session(sessionConfig)); //activates sessions

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate('session')); //activates passport

app.use(morgan("dev"));

app.use(express.json());

app.use("/movie", movieRoutes);

app.use("/users", userRoutes);

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found!")));

app.use(errorHandler);

export default app;