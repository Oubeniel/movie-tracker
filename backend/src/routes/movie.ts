import express from 'express';
import { getAllMovieDetails, getMovieByTitle } from '../controllers/movie';

const router = express.Router();

router.get("/movie/search", getMovieByTitle);

router.get("/movie/:id", getAllMovieDetails);




router.get('/', (req, res) => {
    res.send('Server is up and running!');
});

export default router;