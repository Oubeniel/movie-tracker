import express from "express";
import "dotenv/config";
import cors from "cors"
import env from "./env";
import movieRoutes from "./routes/movie";

const app = express();

app.use(cors({
    origin: env.WEBSITE_URL,
    credentials: true,
}));

app.use(express.json());

app.use(movieRoutes);

export default app;