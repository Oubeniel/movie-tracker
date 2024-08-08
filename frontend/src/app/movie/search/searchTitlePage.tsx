import * as MovieApi from "@/network/api/movies";
import MovieCardGrid from "@/components/MovieCardGrid";
import MovieListPaginationBar from "@/components/MovieListPaginationBar";
import MovieSearchBar from "@/components/MovieSearchBar";

interface MovieInfoSectionProps {
    page?: number,
    search?: string,
    filter?: string
}

const MovieInfoSection = async ({ page, search, filter }: MovieInfoSectionProps) => {
    const { movies, page: currentPage, totalPages } = await MovieApi.getAllMoviesAdvancedSearch(search, page, filter);
    return (
        <div>
            <MovieSearchBar />
            {movies.length > 0 && <MovieCardGrid movies={movies} />}
            <MovieListPaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                search={search}
                filter={filter}
            />
        </div>
    )
}

export default MovieInfoSection;