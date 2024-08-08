import {Movie, MoviePage} from "@/models/movie";
import api from "@/network/axiosInstance";


export async function getAllMovies(page: number = 1) {
    const response = await api.get<MoviePage>("/movie?page=" + page);
    return response.data;
}

export async function getAllMoviesWithSearch(searchString?: string, page?: number) {
    const response = await api.get<MoviePage>(`/movie?page=${page}&search=${searchString}`);
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

export async function getMovies(title: string) {
    const response = await api.get<Movie>("/movie/titles", { params: { title } });
    return response.data;
}

export async function postTestMovieTitle() {
    const title = "Test Movie Title";
    const response = await api.post<Movie>("/movie", { title });
    return response.data;
}

export async function searchMovie(title: string) {
    const response = await api.get<[]>("/movie/search", { params: { title } });
    console.log(response.data);
    
    return response.data;
}
