import * as MovieApi from "@/network/api/movies";
import SingularMoviePage from './singularMoviePage';

interface MoviePageProps {
    params: {
        id: string
    }
}

const MovieInfoSection = async ({params}: MoviePageProps) => {
    const movieDetails = await MovieApi.getSingularMovie(params.id);
    const movieListBasedOnDirector = await MovieApi.getAllMoviesAdvancedSearch({
        searchString: movieDetails.directors[0],
        page: 1,
        pageSize: 12,
        filter: 'directors'
    });
    return (
        <div>
            <SingularMoviePage movie={movieDetails} directorMovieList={movieListBasedOnDirector}/>
        </div>
    )
}

export default MovieInfoSection;