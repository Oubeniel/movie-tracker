import MovieInfoSection from "./searchTitlePage";

interface SearchPageProps {
  searchParams: {
    page?: number,
    search?: string,
    filter?: string,
    pageSize?: number
  }
}

const SearchPage = ({searchParams}: SearchPageProps) => {
    return (
      <div>
          <MovieInfoSection page={searchParams.page} search={searchParams.search} filter={searchParams.filter} pageSize={searchParams.pageSize}/>
      </div>
    )
  }
  
  export default SearchPage