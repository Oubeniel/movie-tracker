import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Schema, ValidationError } from "yup";

export const validateRequestSchema = (schema: Schema): RequestHandler =>
    async (req, res, next) => { //same as regular RequestHandler declaration, but this way, we can use Schema
        try {
            await schema.validate(req);
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                next(createHttpError(400, error.message));
            } else {
                next(error);
            }
        }
    }