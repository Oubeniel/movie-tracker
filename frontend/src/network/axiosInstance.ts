import axios from "axios";
import { BadRequestError, ConflictError, NotFoundError, TooManyRequestError, UnauthorizedError } from "./http-errors";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(null, error => {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;

        switch (error.response?.status) {
            case 400: throw new BadRequestError(errorMessage);
            case 401: throw new UnauthorizedError(errorMessage);
            case 404: throw new NotFoundError(errorMessage);
            case 409: throw new ConflictError(errorMessage);
            case 429: throw new TooManyRequestError(errorMessage);
        }
    }
    throw error;
}, {synchronous: true}); //set to true if no async stuff is used

export default axiosInstance;