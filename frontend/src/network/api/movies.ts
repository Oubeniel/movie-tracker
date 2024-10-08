import { Movie, MovieChart, MoviePage } from "@/models/movie";
import api from "@/network/axiosInstance";

export async function getAllMovies(page: number = 1) {
    const response = await api.get<MoviePage>("/movie?page=" + page);
    return response.data;
}

    /**
     * Retrieves a list of movies with advanced search options.
     *
     * @param {object} params - The search parameters.
     * @param {number} [params.page] - The page number of the results.
     * @param {string} [params.search] - The search string to filter the movies.
     * @param {string} [params.filter] - The type of filter to apply.
     * @param {number} [params.pageSize] - The number of movies per page.
     * @return {Promise<MoviePage>} - A promise that resolves to the movie page with the search results.
     */
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

export async function getMovieDataForCharts(director: string, _id: string) {
    const response = await api.post<MovieChart[]>(`/movie/${_id}`, { director });
    return response.data;
}