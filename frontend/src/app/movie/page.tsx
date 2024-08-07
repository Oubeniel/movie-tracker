import MovieCardGrid from "@/components/MovieCardGrid";
import * as MovieApi from '@/network/api/movies';
import { redirect } from "next/navigation";
import { stringify } from "querystring";
import MovieListPaginationBar from "./MovieListPaginationBar";

interface MoviePageProps {
    searchParams: { page?: string }
  }

const MainMoviePage = async ({searchParams}: MoviePageProps) => {
    const page = parseInt(searchParams.page?.toString() ?? "1");
    if (page < 1) {
        searchParams.page = "1";
        redirect("/movie?" + stringify(searchParams));
      }
    
      const { movies, page: currentPage, totalPages } = await MovieApi.getAllMovies(page);
    
      if (totalPages > 0 && page > totalPages) {
        searchParams.page = totalPages.toString();
        redirect("/movie?" + stringify(searchParams));
      }
    return (
        <div>
            {movies.length > 0 && <MovieCardGrid movies={movies}/>}
            {movies.length > 0 && 
            <MovieListPaginationBar 
                currentPage={currentPage}
                totalPages={totalPages}
            />
            }
        </div>
    )
}

export default MainMoviePage