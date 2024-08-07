import * as MovieApi from "@/network/api/movies";
import MovieCardGrid from "@/components/MovieCardGrid";
import MovieListPaginationBar from "@/components/MovieListPaginationBar";

interface MovieInfoSectionProps {
    page?: number,
    search?: string
}

const MovieInfoSection = async ({ page, search }: MovieInfoSectionProps) => {
    const { movies, page: currentPage, totalPages } = await MovieApi.getAllMoviesWithSearch(search, page);
    return (
        <div>
            {movies.length > 0 && <MovieCardGrid movies={movies} />}
            <MovieListPaginationBar 
                currentPage={currentPage}
                totalPages={totalPages}
                search={search}
            />
        </div>
    )
}

export default MovieInfoSection;