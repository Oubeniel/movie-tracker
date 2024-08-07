import express from 'express';
import * as MovieController from '../controllers/movie';

const router = express.Router();



router.get("/movie", MovieController.getAllMovies);

router.get("/movie/search", MovieController.getAllMovies);


export default router;