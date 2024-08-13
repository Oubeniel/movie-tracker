import * as MovieApi from "@/network/api/movies";
import SingularMoviePage from './singularMoviePage';

interface MoviePageProps {
    params: {
        id: string
    }
}

const MovieInfoSection = async ({params}: MoviePageProps) => {
    const movieDetails = await MovieApi.getSingularMovie(params.id);
    const movieListBasedOnDirector = await MovieApi.getAllMoviesAdvancedSearch(movieDetails.directors[0], 1, 'directors');
    return (
        <div>
            <SingularMoviePage movie={movieDetails} directorMovieList={movieListBasedOnDirector}/>
        </div>
    )
}

export default MovieInfoSection;