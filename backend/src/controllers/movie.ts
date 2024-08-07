import { RequestHandler } from "express";
import MovieModel from "../models/movie";

interface MovieItem {
    page: string,
    search?: string
}

export const getAllMovies: RequestHandler<unknown, unknown, unknown, MovieItem> = async (req, res) => {
    const page = parseInt(req.query.page ?? "1");
    const pageSize = 12;
    const regex = new RegExp(req.query.search as string, 'i');
    const filter = req.query.search ? { title: regex } : {};    
    try {
        const getMoviesQuery = MovieModel
            .find(filter)
            .sort({title : 1}) // 1 to sort by title in ascending order (i.e., A-Z) -1 sort the other way around
            .select('title year plot poster imdb tomatoes')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const countItemsQuery = MovieModel.countDocuments(filter).exec();

        const [movies, count] = await Promise.all([getMoviesQuery, countItemsQuery]);

        const totalPages = Math.ceil(count / pageSize);
        res.status(200).json({ movies, page, totalPages });
    } catch (error) {
        console.error(error);
    }
}

export const getAllMovieDetails: RequestHandler = async (req, res) => {
    try {
        const movie = await MovieModel.findOne({ _id: req.body._id }).exec();
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
    }
}

export const getMovieByTitle: RequestHandler = async (req, res) => {
    try {
        const { title } = req.query;
        const regex = new RegExp(title as string, 'i');
        const results = await MovieModel.find({ title: regex }).select('title year plot poster imdb tomatoes').exec();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
    }
}

export const addMovie: RequestHandler = async (req, res) => {
    try {
        const movie = await MovieModel.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
    }
}