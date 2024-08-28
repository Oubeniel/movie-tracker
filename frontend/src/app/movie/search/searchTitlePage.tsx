import * as MovieApi from "@/network/api/movies";
import MovieCardGrid from "@/components/MovieCardGrid";
import MovieListPaginationBar from "@/components/MovieListPaginationBar";
import MovieSearchBar from "@/components/MovieSearchBar";

interface MovieInfoSectionProps {
    page?: number,
    search?: string,
    filter?: string,
    pageSize?: number
}

const MovieInfoSection = async ({ page, search, filter, pageSize }: MovieInfoSectionProps) => {
    const { movies, page: currentPage, totalPages } = await MovieApi.getAllMoviesAdvancedSearch({ search, page, pageSize, filter });
    return (
        <div>
            <MovieSearchBar />
            {movies.length > 0 && <MovieCardGrid movies={movies} />}
            <MovieListPaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                search={search}
                filter={filter}
                pageSize={pageSize}
            />
        </div>
    )
}

export default MovieInfoSection;