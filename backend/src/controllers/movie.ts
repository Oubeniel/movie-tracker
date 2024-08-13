import { RequestHandler } from "express";
import MovieModel from "../models/movie";
import createHttpError from "http-errors";

interface MovieItem {
    page: string,
    search?: string,
    filter: string
}

export const getAllMovies: RequestHandler<unknown, unknown, unknown, MovieItem> = async (req, res, next) => {
    const page = parseInt(req.query.page ?? "1");
    const pageSize = 12;
    const regex = new RegExp(req.query.search as string, 'i')
    let filter = {}
    switch (req.query.filter) {
        case "genres":
            filter = req.query.search ? { genres: regex } : {}; 
            break;
        case "cast":
            filter = req.query.search ? { cast: regex } : {};
            break;
        case "directors":
            filter = req.query.search ? { directors: regex } : {};
            break;
        case "title":
            filter = req.query.search ? { title: regex } : {};
            break;
    }
      
    try {
        const getMoviesQuery = MovieModel
            .find(filter)
            .sort({title : 1}) // 1 to sort by title in ascending order (i.e., A-Z) -1 sort the other way around
            .select('title year plot poster imdb tomatoes genres cast directors awards')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const countItemsQuery = MovieModel.countDocuments(filter).exec();

        const [movies, count] = await Promise.all([getMoviesQuery, countItemsQuery]);

        const totalPages = Math.ceil(count / pageSize);
        res.status(200).json({ movies, page, totalPages });
    } catch (error) {
        next(error);
    }
}

export const getFullMovieDetails: RequestHandler = async (req, res, next) => {
    try {
        const movieItem = await MovieModel
            .findById({ _id: req.params.id })
            .exec();

        if (!movieItem) {
            throw createHttpError(404, "No movie found for ID.");
        }

        res.status(200).json(movieItem);
    } catch (error) {
        next(error);
    }
}
