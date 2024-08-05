import { RequestHandler } from "express";
import MovieModel from "../models/movie";

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
        const results = await MovieModel.find({ title: regex }).select('title year plot').exec();
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