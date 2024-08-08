import { Movie } from "@/models/movie"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

interface MovieInfoToolTipProps {
    movie: Movie
}

const MovieInfoToolTip = ({ movie }: MovieInfoToolTipProps) => {

    return (
        <OverlayTrigger
            overlay={
                <Tooltip>
                    <ToolTipContent movie={movie} />
                </Tooltip>
            }
            delay={{ show: 500, hide: 0 }}
        >
            <span>
                {movie.title}
            </span>
        </OverlayTrigger>
    )
}

interface ToolTipProps {
    movie: Movie
}

function ToolTipContent({ movie }: ToolTipProps) {

    return (
        <div className="text-start">
            <strong>Genres: </strong> {movie.genres.join(', ')} <br />
            <strong>Cast: </strong> {movie.cast.join(', ')} <br />
            <strong>Directors: </strong> {movie.directors.join(', ')} <br />
            <strong>Awards: </strong> {movie.awards.text} <br />
        </div>
    )
}

export default MovieInfoToolTip