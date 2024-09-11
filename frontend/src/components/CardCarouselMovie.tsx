"use client"
import { Movie, MoviePage } from "@/models/movie"
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import MovieCardEntry from "./MovieCardEntry";

interface CardCarouselMovieProps {
    moviesItem: MoviePage,
    movieID: string
}

function MovieItemChunker(movies: Movie[], currentMovie: string) {
    let movieChunks: Movie[][] = [];
    const filteredMovies = movies.filter(movie => movie._id !== currentMovie);

    for (let i = 0; i < filteredMovies.length; i += 3) {
        const chunk = filteredMovies.slice(i, i + 3);
        movieChunks.push(chunk);
    }

    return movieChunks;
}

const CardCarouselMovie = ({ moviesItem, movieID }: CardCarouselMovieProps) => {
    const movieChunks = MovieItemChunker(moviesItem.movies, movieID);
    const [hidden, setHidden] = useState(0);
    return (
        <>
            {moviesItem.movies.length > 1 ?
                movieChunks.map((chunk, index) => (
                    <Row className={`d-flex justify-content-center ${index !== hidden ? "d-none" : ""}`} key={index}>
                        {chunk.map((movie) => (
                            <Col xs={4}>
                                <MovieCardEntry movie={movie} />
                            </Col>
                        ))}
                    </Row>
                ))
                :
                <span className="d-flex justify-content-center">No movies found</span>
            }
            {moviesItem.movies.length > 4 &&
                <div className="d-flex justify-content-center">
                    <Button className="m-2" variant="outline-primary" onClick={() => setHidden(hidden - 1)} disabled={hidden === 0 ? true : false}>Previous</Button>
                    <Button className="m-2" variant="outline-primary" onClick={() => setHidden(hidden + 1)} disabled={hidden === movieChunks.length - 1 ? true : false}>Next</Button>
                </div>
            }
        </>
    )
}

export default CardCarouselMovie