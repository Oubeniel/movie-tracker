import MovieInfoSection from "./searchTitlePage";

interface SearchPageProps {
  searchParams: {
    page?: number,
    search?: string,
    filter?: string
  }
}

const SearchPage = ({searchParams}: SearchPageProps) => {
    return (
      <div>
          <MovieInfoSection page={searchParams.page} search={searchParams.search} filter={searchParams.filter}/>
      </div>
    )
  }
  
  export default SearchPage