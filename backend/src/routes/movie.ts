import express from 'express';
import * as MovieController from '../controllers/movie';

const router = express.Router();

router.post("/:id", MovieController.getMovieDataForCharts);

router.get("/search", MovieController.getAllMovies);

router.get("/", MovieController.getAllMovies);

router.get("/:id", MovieController.getFullMovieDetails);

export default router;