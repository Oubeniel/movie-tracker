import MovieInfoSection from "./searchTitlePage";
import styles from "./searchPage.module.css";

const SearchPage = () => {
    return (
      <div>
          <h1 className={styles.searchTitle}>Search for movies</h1>
          <MovieInfoSection />
      </div>
    )
  }
  
  export default SearchPage