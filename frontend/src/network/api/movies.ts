import {Movie, MoviePage} from "@/models/movie";
import api from "@/network/axiosInstance";


export async function getAllMovies(page: number = 1) {
    const response = await api.get<MoviePage>("/movie?page=" + page);
    return response.data;
}

/**
 * Retrieves a list of movies with advanced search options.
 *
 * @param {string} [searchString] - The search string to filter the movies.
 * @param {number} [page] - The page number of the results.
 * @param {string} [filter] - The type of filter to apply.
 * @return {Promise<MoviePage>} - A promise that resolves to the movie page with the search results.
 */
export async function getAllMoviesAdvancedSearch(searchString?: string, page?: number, filter?: string) {
    const response = await api.get<MoviePage>(`/movie/search?page=${page}&search=${searchString}&filter=${filter}`);
    return response.data;
}

export async function getSingularMovie(_id: string) {
    const response = await api.get<Movie>(`/movie/${_id}`);
    return response.data;
}