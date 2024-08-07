import {Movie, MoviePage} from "@/models/movie";
import api from "@/network/axiosInstance";


export async function getAllMovies(page: number = 1) {
    const response = await api.get<MoviePage>("/movie?page=" + page);
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
