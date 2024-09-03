import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error);
    let statusCode = 500; //let because we want to change the variable later
    let errorMessage = "Unknown error occurred";
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
}

export default errorHandler;