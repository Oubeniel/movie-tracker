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
        search: movieDetails.directors[0],
        filter: 'directors'
    });
    const movieChartData = await MovieApi.getMovieDataForCharts(movieDetails.directors[0], params.id);
    return (
        <div>
            <SingularMoviePage movie={movieDetails} directorMovieList={movieListBasedOnDirector} movieChartData={movieChartData}/>
        </div>
    )
}

export default MovieInfoSection;