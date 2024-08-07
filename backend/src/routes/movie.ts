import express from 'express';
import * as MovieController from '../controllers/movie';

const router = express.Router();

router.get("/movie/search", MovieController.getMovieByTitle);

router.get("/movie", MovieController.getAllMovies);


router.get('/', (req, res) => {
    res.send('Server is up and running!');
});

export default router;