import * as MovieApi from "@/network/api/movies";

interface MoviePageProps {
    params: {
        _id: string
    }
}

export async function getMovieTitles() {

}

const MovieInfoSection = async ({params}: MoviePageProps) => {
    console.log("page works");
    const movieTitles = await getMovieTitles();
    return (
        <div>
            text
        </div>
    )
}

export default MovieInfoSection;