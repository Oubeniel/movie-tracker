import { Movie, MoviePage } from "@/models/movie";
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
/* export async function getAllMoviesAdvancedSearch(searchString?: string, page?: number, pageSize?: number, filter?: string) {
    let url = "/movie/search";
    const params: string[] = []

    if (searchString) params.push(`search=${searchString}`);
    if (page) params.push(`page=${page}`);
    if (pageSize) params.push(`pageSize=${pageSize}`);
    if (filter) params.push(`filter=${filter}`);

    if (params.length > 0) url += `?${params.join("&")}`;

    const response = await api.get<MoviePage>(url);
    //const response = await api.get<MoviePage>(`/movie/search?page=${page}&pageSize=${pageSize}&search=${searchString}&filter=${filter}`);
    return response.data;
} */

export async function getAllMoviesAdvancedSearch(params: { [key: string]: string | number | undefined }) {
    let url = "/movie/search";
    const queryParameters: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryParameters.push(`${key}=${value}`);
        }
    });

    if (queryParameters.length > 0) {
        url += `?${queryParameters.join("&")}`;
    }

    const response = await api.get<MoviePage>(url);
    return response.data;
}


export async function getSingularMovie(_id: string) {
    const response = await api.get<Movie>(`/movie/${_id}`);
    return response.data;
}