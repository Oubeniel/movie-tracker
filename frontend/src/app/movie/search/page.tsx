import MovieInfoSection from "./searchTitlePage";

interface SearchPageProps {
  searchParams: {
    page?: number,
    search?: string
  }
}

const SearchPage = ({searchParams}: SearchPageProps) => {
    return (
      <div>
          <MovieInfoSection page={searchParams.page} search={searchParams.search}/>
      </div>
    )
  }
  
  export default SearchPage