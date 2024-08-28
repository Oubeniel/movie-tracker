import express from 'express';
import * as MovieController from '../controllers/movie';

const router = express.Router();

router.post("/movie/:id", MovieController.getMovieDataForCharts);

router.get("/movie/search", MovieController.getAllMovies);

router.get("/movie", MovieController.getAllMovies);

router.get("/movie/:id", MovieController.getFullMovieDetails);

export default router;